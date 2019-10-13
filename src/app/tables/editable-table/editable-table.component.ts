import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PaginateRowsPipe } from '../paginate-rows.pipe';
import { FilterTablePipe } from '../filter-table.pipe';

const enum SortDirection { 'asc', 'desc' }
@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditableTableComponent implements OnInit {

  errorMessage = '';
  isFieldFilteringEnabled = false;
  globalFilterInputKeyword = '';
  fieldFilterInputKeywords: {};
  displayableColumns: any[];
  defaultDisplayableColumns: string[];
  currentPageNumber: number;
  totalPages: number;


  @Input() tableSchema: {
    pageSize?: number,
    sort?: {
      sortField: string;
      sortOrder: SortDirection;
    },
    columnSchema: {
      name: 'string',
      label: 'string',
      display?: boolean,
      filter?: boolean
    }[]
  };

  @Input() tableData: any[];

  constructor(private changeDetector: ChangeDetectorRef, private filterTable: FilterTablePipe) {}

  randomDate(start: Date, end: Date) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  randomizeDates() {
    this.tableData.map(row => {
      const temp = row;
      temp.createdAt = this.randomDate(new Date(2012, 0, 1), new Date());
      temp.updatedAt = this.randomDate(new Date(2012, 0, 1), new Date());
      return temp;
    });
  }

  ngOnInit() {
    if (!this.tableData || !this.tableSchema || !this.tableSchema.columnSchema) {
      return;
    }
    this.randomizeDates();
    this.setDisplayableColumns();
    if (this.displayableColumns.length === 0) {
      this.errorMessage = 'No displayable column in table';
      this.tableData = null;
      return;
    }
    this.setDefaultDisplayableColumns();

    this.setPaginationVariables();

    this.setSortConfig();
    this.isAnyColumnWithFieldFilter();
    this.sortTable();
    if (this.isFieldFilteringEnabled) {
      this.fieldFilterInputKeywords = {};
      this.setFieldFilterVariables();
    }
  }

  isAnyColumnWithFieldFilter() {
    if (this.tableSchema.columnSchema.find(column => column.filter === true)) {
      this.isFieldFilteringEnabled = true;
    }
  }

  filterTableWithGlobalSearch() {
    this.setCurrentPageNumber(1);
    this.setTotalPages();
  }

  clearGlobalFilterVariable() {
    this.globalFilterInputKeyword = '';
    this.filterTableWithGlobalSearch();
  }

  filterTableWithFieldSearch() {
    this.setCurrentPageNumber(1);
    this.setTotalPages();
  }

  clearFieldFilterVariable(columnName) {
    this.fieldFilterInputKeywords[columnName] = '';
    this.filterTableWithFieldSearch();
  }

  setFieldFilterVariables() {
    this.tableSchema.columnSchema.forEach(column => {
      if (column.filter && column.filter === true) {
        this.fieldFilterInputKeywords[column.name] = '';
      }
    });
  }

  setDisplayableColumns() {
    this.displayableColumns = this.tableSchema.columnSchema.filter(
      column => column.display && column.display === true
    );
  }

  setDefaultDisplayableColumns() {
    this.defaultDisplayableColumns = [];
    this.displayableColumns.forEach(column => {
      this.defaultDisplayableColumns.push(column.name);
    });
  }

  setSortConfig() {
    if (!this.tableSchema.sort) {
      this.tableSchema.sort = {
        sortField: this.displayableColumns[0].name,
        sortOrder: SortDirection.asc
      };
    }
    if (!this.tableSchema.sort.sortField) {
      this.tableSchema.sort.sortField = this.displayableColumns[0].name;
    }
    if (!this.tableSchema.sort.sortOrder) {
      this.tableSchema.sort.sortOrder = SortDirection.asc;
    }
  }

  sortTable() {
    const sortOrder =
      this.tableSchema.sort.sortOrder === SortDirection.asc ? 'asc' : 'desc';
    const sortByField = this.tableSchema.sort.sortField;

    if (sortOrder === 'asc') {
      this.tableData.sort((a, b) => {
        return a[sortByField] < b[sortByField]
          ? -1
          : a[sortByField] > b[sortByField]
          ? 1
          : 0;
      });
    } else {
      this.tableData.sort((a, b) => {
        return a[sortByField] < b[sortByField]
          ? 1
          : a[sortByField] > b[sortByField]
          ? -1
          : 0;
      });
    }
  }

  changeSort(fieldName) {
    if (this.tableSchema.sort.sortField === fieldName) {
      this.tableSchema.sort.sortOrder =
        this.tableSchema.sort.sortOrder === SortDirection.asc
          ? SortDirection.desc
          : SortDirection.asc;
    } else {
      this.tableSchema.sort.sortField = fieldName;
      this.tableSchema.sort.sortOrder = SortDirection.asc;
    }
    this.sortTable();
  }

  manageTableDisplay(columnName: string, checked: boolean) {
    this.tableSchema.columnSchema.map(column => {
      if (column.name === columnName) {
        column.display = checked;
        column.filter = true;
      }
      return column;
    });
    this.setDisplayableColumns();
    this.changeDetector.detectChanges();
  }

  setPaginationVariables() {
    if (!this.tableSchema.pageSize) {
      this.tableSchema.pageSize = 5;
    }
    this.currentPageNumber = 1;
    this.setTotalPages();
  }

  setCurrentPageNumber(pageNumber) {
    if (pageNumber < 1) {
      pageNumber = 1;
    } else if (pageNumber > this.totalPages) {
      pageNumber = this.totalPages;
    }
    this.currentPageNumber = pageNumber;
  }

  setTotalPages() {
    const filterObj = {
      globalFilterKeyword: this.globalFilterInputKeyword ? this.globalFilterInputKeyword : '',
      fieldFilterKeywords: this.fieldFilterInputKeywords ? this.fieldFilterInputKeywords : []
    };
    this.totalPages = Math.ceil(
      this.filterTable.transform(
        this.tableData,
        filterObj
      ).length / this.tableSchema.pageSize
    );
  }
}
