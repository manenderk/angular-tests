import { Component, OnInit, Input } from '@angular/core';


const enum SortDirection { 'asc', 'desc' }

@Component({
  selector: 'app-editable-table2',
  templateUrl: './editable-table2.component.html',
  styleUrls: ['./editable-table2.component.css']
})
export class EditableTable2Component implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

}
