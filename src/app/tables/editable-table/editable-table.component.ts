import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

const enum SortDirection { 'asc', 'desc' }
@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EditableTableComponent implements OnInit {
  isFieldFilteringEnabled = false;
  globalFilterInputKeyword = '';
  fieldFilterInputKeywords: {};

  // tslint:disable-next-line: no-input-rename
  @Input('column-schema') columnSchema: any[] = [
    {
      name: 'id',
      label: 'ID',
      filter: true
    },
    {
      name: 'firstName',
      label: 'First Name',
      filter: true
    },
    {
      name: 'createdAt',
      label: 'Added On',
      filter: true
    },
    {
      name: 'updatedAt',
      label: 'Modified On'
    }
  ];

  // tslint:disable-next-line: no-input-rename
  @Input('table-schema') tableSchema: {
    sort: {
      sortField: string,
      sortOrder: SortDirection
    }
  };

  tableData = [
    {
      id: 1,
      firstName: 'Ratnesh',
      updatedAt: new Date(),
      createdAt: new Date()
    },
    { id: 2, firstName: 'Zing', updatedAt: new Date(), createdAt: new Date() },
    { id: 3, firstName: 'Greg', updatedAt: new Date(), createdAt: new Date() },
    { id: 4, firstName: 'Sana', updatedAt: new Date(), createdAt: new Date() },
    { id: 5, firstName: 'Neha', updatedAt: new Date(), createdAt: new Date() },
    { id: 6, firstName: 'Kiran', updatedAt: new Date(), createdAt: new Date() },
    { id: 7, firstName: 'John', updatedAt: new Date(), createdAt: new Date() },
    {
      id: 8,
      firstName: 'Engliue',
      updatedAt: new Date(),
      createdAt: new Date()
    },
    {
      id: 9,
      firstName: 'Marina',
      updatedAt: new Date(),
      createdAt: new Date()
    },
    { id: 10, firstName: 'Vivek', updatedAt: new Date(), createdAt: new Date() }
  ];

  constructor() {}

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
    if (!this.tableData || !this.columnSchema) {
      return;
    }
    if (!this.tableSchema) {
      this.tableSchema = {
        sort: {
          sortField: this.columnSchema[0].name,
          sortOrder: SortDirection.asc
        }
      };
    }
    this.randomizeDates();
    this.isAnyColumnWithFieldFilter();
    this.sortTable();
    if (this.isFieldFilteringEnabled) {
      this.fieldFilterInputKeywords = {};
      this.setFieldFilterVariables();
    }
  }

  isAnyColumnWithFieldFilter() {
    if (this.columnSchema.find(column => column.filter === true)) {
      this.isFieldFilteringEnabled = true;
    }
  }

  filterTableWithGlobalSearch() {
    // console.log(this.globalFilterInputKeyword);
  }

  clearGlobalFilterVariable() {
    this.globalFilterInputKeyword = '';
  }

  filterTableWithFieldSearch() {
    // console.log(this.fieldFilterInputKeywords);
  }

  setFieldFilterVariables() {
    this.columnSchema.forEach(column => {
      if (column.filter && column.filter === true) {
        this.fieldFilterInputKeywords[column.name] = '';
      }
    });
  }

  sortTable() {
    const sortOrder = this.tableSchema.sort.sortOrder === SortDirection.asc ? 'asc' : 'desc';
    const sortByField = this.tableSchema.sort.sortField;

    if (sortOrder === 'asc') {
      this.tableData.sort((a, b) => {
        return a[sortByField] < b[sortByField] ? -1 : a[sortByField] > b[sortByField] ? 1 : 0;
      });
    } else {
      this.tableData.sort((a, b) => {
        return a[sortByField] < b[sortByField] ? 1 : a[sortByField] > b[sortByField] ? -1 : 0;
      });
    }
  }

  changeSort(fieldName) {
    if (this.tableSchema.sort.sortField === fieldName) {
      this.tableSchema.sort.sortOrder = this.tableSchema.sort.sortOrder === SortDirection.asc ? SortDirection.desc : SortDirection.asc;
    } else {
      this.tableSchema.sort.sortField = fieldName;
      this.tableSchema.sort.sortOrder = SortDirection.asc;
    }
    this.sortTable();
  }

  manageTableDisplay(data) {
    console.log(data);
  }
}
