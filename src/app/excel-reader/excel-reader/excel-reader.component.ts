import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel-reader',
  templateUrl: './excel-reader.component.html',
  styleUrls: ['./excel-reader.component.css']
})
export class ExcelReaderComponent implements OnInit {


  importedData: any[] = [];

  constructor() { }

  ngOnInit() {

  }

  readExcel(event) {
    let workBook = null;
    const reader = new FileReader();
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    reader.onload = (e) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      const firstSheetName = workBook.SheetNames[0];
      const sheet = workBook.Sheets[firstSheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);
      console.log(sheetData);
      this.importData(sheetData);

    };
    reader.readAsBinaryString(file);
  }

  importData(sheetData) {
    let i = 0;
    const headerRow = [];
    for (const row of sheetData) {
      let j = 0;
      const dataRow = [];
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          if (!headerRow[j]) {
            headerRow[j] = key;
          }
          const element = row[key];
          dataRow[j] = element;
          j++;
        }
      }
      this.importedData[i] = dataRow;
      i++;
    }
    this.importedData.unshift(headerRow);
  }

}
