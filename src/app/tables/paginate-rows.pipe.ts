import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginateRows',
  pure: false
})
export class PaginateRowsPipe implements PipeTransform {

  transform(rows: any[], paginateData: {currentPageNumber: number, pageSize: number}): any {
    const newRows = rows.slice(
      (paginateData.currentPageNumber - 1) * paginateData.pageSize,
      paginateData.currentPageNumber * paginateData.pageSize
    );
    return newRows;
  }

}
