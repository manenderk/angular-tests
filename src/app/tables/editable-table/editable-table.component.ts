import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
  isGlobalFilterEnabled = false;
  isFieldFilteringEnabled = false;
  isInlineEditingEnabled = false;
  globalFilterInputKeyword = '';
  fieldFilterInputKeywords: {};
  displayableColumns: any[];
  defaultDisplayableColumns: string[];
  currentPageNumber: number;
  totalPages: number;
  private defaultPageSize = 10;
  private defaultCurrentPage = 1;


  @Input() tableSchema: {
    rowIdColumnName?: string,
    hideGlobalFilter?: boolean
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

  ngOnInit() {
    if (!this.tableData || !this.tableSchema || !this.tableSchema.columnSchema) {
      return;
    }
    this.setDisplayableColumns();
    if (this.displayableColumns.length === 0) {
      this.errorMessage = 'No displayable column in table';
      this.tableData = null;
      return;
    }
    if (this.tableSchema.rowIdColumnName && this.tableSchema.rowIdColumnName !== '') {
      this.isInlineEditingEnabled = true;
    }
    this.configureTableVariables();
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

  configureTableVariables() {
    if (this.tableSchema.hideGlobalFilter && this.tableSchema.hideGlobalFilter === true) {
      this.isGlobalFilterEnabled = false;
    } else {
      this.isGlobalFilterEnabled = true;
    }
  }

  isAnyColumnWithFieldFilter() {
    if (this.tableSchema.columnSchema.find(column => column.filter === true)) {
      this.isFieldFilteringEnabled = true;
    }
  }

  applyFilter() {
    this.setCurrentPageNumber(1);
    this.setTotalPages();
  }

  clearGlobalFilterVariable() {
    this.globalFilterInputKeyword = '';
    this.applyFilter();
  }

  clearFieldFilterVariable(columnName) {
    this.fieldFilterInputKeywords[columnName] = '';
    this.applyFilter();
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
      this.tableSchema.pageSize = this.defaultPageSize;
    }
    this.currentPageNumber = this.defaultCurrentPage;
    this.setTotalPages();
  }

  setCurrentPageNumber(pageNumber) {
    if (pageNumber < 1) {
      pageNumber = this.defaultCurrentPage;
    } else if (pageNumber > this.totalPages && this.totalPages !== 0) {
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

  updateColumnData(rowId: any, columnName: string, event: any) {
    console.log(rowId, event.target.textContent);
  }
}
