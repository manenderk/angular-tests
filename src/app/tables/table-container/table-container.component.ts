import { Component, OnInit } from '@angular/core';
import { TableData } from '../table-data';


@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.css']
})
export class TableContainerComponent implements OnInit {

  tableData = [];
  constructor() { }

  ngOnInit() {
    this.tableData = TableData;
  }

}
