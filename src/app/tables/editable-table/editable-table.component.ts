import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FilterTablePipe } from '../filter-table.pipe';
import { Observable, Subscription } from 'rxjs';

const enum SortDirection { 'asc', 'desc' }

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditableTableComponent implements OnInit, OnDestroy {
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
  private defaultDateFormat = 'dd/mm/YYYY';
  private defaultDateTimeFormat = 'dd/MM/YYYY hh:mm:ss';
  private defaultTimeFormat = 'hh:mm:ss';
  private tableEventSubscription: Subscription;

  @Input() tableSchema: {
    recordIdColumnName?: string;
    hideGlobalFilter?: boolean;
    pageSize?: number;
    dateFormat?: string;
    dateTimeFormat?: string;
    timeFormat?: string;
    sort?: {
      sortField: string;
      sortOrder: SortDirection;
    };
    columnSchema: {
      name: 'string';
      label: 'string';
      display?: boolean;
      filter?: boolean;
      dataType: string;
    }[];
  };

  @Input() tableData: any[];

  @Input() tableEvents: Observable<{eventType: string, tableData: any[]}>;

  @Output() dataUpdated = new EventEmitter<{
    recordId: string | number;
    fieldName: string;
    data: string;
  }>();

  constructor(
    private changeDetector: ChangeDetectorRef,
    private filterTable: FilterTablePipe
  ) {}

  ngOnInit() {
    this.initializeTable();
    if (this.tableEvents) {
      this.tableEventSubscription = this.tableEvents.subscribe((data) => {
        this.updateTableData(data.tableData);
      });
    }
  }

  ngOnDestroy() {
    if (this.tableEventSubscription) {
      this.tableEventSubscription.unsubscribe();
    }
  }


  updateTableData(tableData: any) {
    console.log('IN CHILD COMPONENT');
    this.tableData = JSON.parse(JSON.stringify(tableData));
  }

  initializeTable() {

    // CHECK IF TABLE DATA AND TABLE SCHEMA AND COLUMN SCHEMA ARE PRESENT. IF ONE OF THESE IS NOT PRESENT THEN SHOW ERROR
    if (
      !this.tableData ||
      !this.tableSchema ||
      !this.tableSchema.columnSchema
    ) {
      this.errorMessage = 'Insufficient data provided';
      this.tableData = null;
      return;
    }

    this.tableData = JSON.parse(JSON.stringify(this.tableData));

    // GET LIST OF DISPLAYABLE COLUMNS WHICH SHOULD BE DISPLAYED BY DEFAULT
    this.setDisplayableColumns();

    // CHECK IF THERE IS NO DISPLAYABLE COLUMN
    if (this.displayableColumns.length === 0) {
      this.errorMessage = 'No displayable column in table';
      this.tableData = null;
      return;
    }

    // ALLOW INLINE EDITING FEATURE ONLY IF ROW ID COLUMN NAME VARIABLE IS PROVIDED IN THE TABLE SCHEMA
    if (
      this.tableSchema.recordIdColumnName &&
      this.tableSchema.recordIdColumnName !== ''
    ) {
      this.isInlineEditingEnabled = true;
    }

    // CONFIGURE TABLE VARIABLES - SET DEFAULT IF SOME VARIABLE IS MISSING
    this.configureTableVariables();

    // SET DEFAULT COLUMNS TO BE DISPLAYED IN THE LIST
    this.setDefaultDisplayableColumns();

    // INITIALIZE PAGINATION FOR THE TABLE
    this.setPaginationVariables();

    // INITIALIZE SORTING FOR THE TABLE
    this.setSortConfig();
    this.sortTable();

    // CHECK IF THERE IS ANY COLUMN WHICH NEEDS FEILD LEVEL FILTERING
    this.isAnyColumnWithFieldFilter();

    // ALLOW FIELD LEVEL FILTERING IF THERE IS SOME COLUMN WHICH NEEDS TO BE FILTERED
    if (this.isFieldFilteringEnabled) {
      this.fieldFilterInputKeywords = {};
      this.setFieldFilterVariables();
    }
  }


  configureTableVariables() {
    this.tableData = JSON.parse(JSON.stringify(this.tableData));

    if (
      this.tableSchema.hideGlobalFilter &&
      this.tableSchema.hideGlobalFilter === true
    ) {
      this.isGlobalFilterEnabled = false;
    } else {
      this.isGlobalFilterEnabled = true;
    }


    if (!this.tableSchema.dateFormat || this.tableSchema.dateFormat === '') {
      this.tableSchema.dateFormat = this.defaultDateFormat;
    }
    if (!this.tableSchema.dateTimeFormat || this.tableSchema.dateTimeFormat === '') {
      this.tableSchema.dateTimeFormat = this.defaultDateTimeFormat;
    }
    if (!this.tableSchema.timeFormat || this.tableSchema.timeFormat === '') {
      this.tableSchema.timeFormat = this.defaultTimeFormat;
    }
  }

  setDataTypes() {

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
      globalFilterKeyword: this.globalFilterInputKeyword
        ? this.globalFilterInputKeyword
        : '',
      fieldFilterKeywords: this.fieldFilterInputKeywords
        ? this.fieldFilterInputKeywords
        : []
    };
    this.totalPages = Math.ceil(
      this.filterTable.transform(this.tableData, filterObj).length /
        this.tableSchema.pageSize
    );
  }

  updateColumnData(rowId: any, columnName: string, event: any) {

    const updatedData = {
      recordId: rowId,
      fieldName: columnName,
      data: event.target.textContent.trim()
    };

    const updatedRow = this.tableData.find(row => {
        return (
          row[this.tableSchema.recordIdColumnName] === updatedData.recordId &&
          row[columnName] !== updatedData.data
        );
    });

    if (!updatedRow) {
      console.log('NOTHING IS UPDATED');
      return;
    }

    console.log('UPDATED ROW');
    console.log(updatedRow);

    const oldColumnData = updatedRow[columnName];

    console.log('EMITTING EVENT FROM CHILD COMPONENT');
    this.dataUpdated.emit(updatedData);
  }

  getDataType(columnName) {
    const column = this.tableSchema.columnSchema.find(col => col.name === columnName);
    if (column) {
      return column.dataType;
    } else {
      return false;
    }
  }
}
