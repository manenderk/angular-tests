import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnDestroy {

  constructor() { }
  paginationList: number[];
  currentPage: number;

  @Input() paginationData: {
    perPage: number,
    currentPage: number,
    totalRows: Observable<number>
  };

  @Output() currentPageChanged = new EventEmitter<number>();

  totalRowsSubscription: Subscription;

  ngOnInit() {
    if (!this.paginationData) {
      return;
    }
    this.currentPage = this.paginationData.currentPage;
    this.totalRowsSubscription = this.paginationData.totalRows.subscribe((rows) => {
      this.generatePaginationList(rows);
    });
  }

  generatePaginationList(rows) {
    this.paginationList = [];
    const maxItems = Math.ceil(rows / this.paginationData.perPage);
    for (let i = 1; i <= maxItems; i++) {
      this.paginationList.push(i);
    }
  }

  ngOnDestroy() {
    this.totalRowsSubscription.unsubscribe();
  }

  changeCurrentPage(currentPage: number) {
    if (currentPage < 1 && currentPage > this.paginationList.length) {
      return;
    }
    this.currentPage = currentPage;
    this.currentPageChanged.emit(currentPage);
  }
}
