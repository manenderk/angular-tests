import { Component, OnInit, Directive, ViewChild } from '@angular/core';
import { TableData } from '../table-data';
import { TableSchema } from '../table-schema';
import { Subject } from 'rxjs';


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
    tableSchema: any;
    tableData: any;
  };

  tableEvents: Subject<{
    eventType: string;
    tableData: any[];
  }> = new Subject<{ eventType: string; tableData: any[] }>();

  constructor() {}

  ngOnInit() {
    /* this.tableData = TableData;
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
    }; */

    this.editableTable = {
      tableData: TableData,
      tableSchema: TableSchema
    };

    /* setInterval(() => {
      const newRow = this.editableTable.tableData[0];
      console.log('OLD DATA', newRow.name);
      newRow.name = this.makeid(10);
      this.editableTable.tableData[0] = newRow;
      console.log('NEW DATA', newRow.name);
      this.tableEvents.next({
        eventType: 'update',
        tableData: this.editableTable.tableData
      });
    }, 5000); */
  }

  makeid(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  updateDataAction(data: {recordId: any, fieldName: string, data: any}) {
    this.editableTable.tableData.map(ob => {
      if (ob.id === data.recordId) {
        console.log('UPDATING DATA IN PARENT COMPONENT');
        ob[data.fieldName] = ob[data.fieldName] + ob[data.fieldName];
      }
      return ob;
    });
    // adding dummy delay

    setTimeout(() => {
      console.log('EMITTING EVENT FROM PARENT COMPONENT');
      this.tableEvents.next({
        eventType: 'update',
        tableData: this.editableTable.tableData
      });
    }, 5000);
  }
}
