import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTable',
  pure: false
})
export class FilterTablePipe implements PipeTransform {
  transform(
    rows: any[],
    filterObj: {
      globalFilterKeyword: string;
      fieldFilterKeywords: {};
    }
  ): any {
    rows = this.filterGlobaly(rows, filterObj.globalFilterKeyword);
    rows = this.filterOnFields(rows, filterObj.fieldFilterKeywords);
    return rows;
  }

  filterGlobaly(rows: any[], globalFilterKeyword: string) {
    if (globalFilterKeyword && globalFilterKeyword !== '') {
      rows = rows.filter(row =>
        Object.keys(row).find(key => {
          const searchRegex = new RegExp(globalFilterKeyword, 'gmi');
          const searchString = row[key].toString();
          return searchString.search(searchRegex) !== -1;
        })
      );
    }
    return rows;
  }

  filterOnFields(rows: any[], fieldFilterKeywords: {}) {
    Object.keys(fieldFilterKeywords).map(key => {
      if (fieldFilterKeywords[key] !== '') {
        rows = rows.filter(row => {
          const searchRegex = new RegExp(fieldFilterKeywords[key], 'gmi');
          const searchString = row[key].toString();
          return searchString.search(searchRegex) !== -1;
        });
      }
    });
    return rows;
  }
}
