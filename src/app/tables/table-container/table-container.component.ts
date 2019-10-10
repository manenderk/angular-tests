import { Component, OnInit } from '@angular/core';
import { TableData } from '../table-data';
import { TableSchema } from '../table-schema';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.css']
})
export class TableContainerComponent implements OnInit {

  columnSchema = [];
  tableData = [];
  tableConfig: any;

  editableTable: {
    tableSchema: any,
    tableData: any
  };
  constructor() { }

  ngOnInit() {
    this.tableData = TableData;
    this.columnSchema = [
      {
        title: 'Name',
        name: 'name',
        filtering: { filterString: '', placeholder: 'Filter by name' }
      },
      {
        title: 'Position',
        name: 'position',
        sort: false,
        filtering: { filterString: '', placeholder: 'Filter by position' }
      },
      {
        title: 'Office',
        className: ['office-header', 'text-success'],
        name: 'office',
        sort: 'asc'
      },
      {
        title: 'Extn.',
        name: 'ext',
        sort: '',
        filtering: { filterString: '', placeholder: 'Filter by extn.' }
      },
      { title: 'Start date', className: 'text-warning', name: 'startDate' },
      { title: 'Salary ($)', name: 'salary' }
    ];
    this.tableConfig = {
      paging: true,
      sorting: { columns: this.columnSchema },
      filtering: { filterString: '' },
      className: ['table-striped', 'table-bordered']
    };

    this.editableTable = {
      tableData: TableData,
      tableSchema: TableSchema
    };
  }

}
