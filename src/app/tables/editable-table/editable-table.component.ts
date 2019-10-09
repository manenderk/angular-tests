import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.css']
})
export class EditableTableComponent implements OnInit {

  isFieldFilteringEnabled = false;
  globalFilterInputKeyword = '';
  fieldFilterInputKeywords: {
    filterFor: string,
    filterKeyword: string;
  }[];

  // tslint:disable-next-line: no-input-rename
  @Input('column-schema') columnSchema: any[] = [
    {
      name: 'id',
      label: 'ID',
      filter: true
    },
    {
      name: 'firstName',
      label: 'First Name'
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
    this.randomizeDates();
    this.isThereAnyColumnWithFilter();
    if (this.isFieldFilteringEnabled) {
      this.fieldFilterInputKeywords = [];
    }
  }

  isThereAnyColumnWithFilter() {
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
    console.log(this.fieldFilterInputKeywords);
  }
}
