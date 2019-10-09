import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableGlobalFilter'
})
export class TableGlobalFilterPipe implements PipeTransform {

  transform(rows: any[], filterString: string): any {
    if (!filterString || filterString === '') {
      return rows;
    }
    return rows.filter(row => Object.keys(row).find(key => {
      const searchRegex = new RegExp(filterString , 'gmi');
      const searchString = row[key].toString();
      return searchString.search(searchRegex) !== -1;
    }));
  }
}
