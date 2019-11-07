import { Component, OnInit } from '@angular/core';
import { TableData } from '../table-data';
import { WordpressService } from '../wordpress.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.css']
})
export class SimpleTableComponent implements OnInit {
  tableSchema = [
    { name: 'id', label: 'ID', dataType: 'string' },
    { name: 'date', label: 'Date', dataType: 'date' },
    { name: 'link', label: 'Link', dataType: 'link' },
    { name: 'title', label: 'Title', dataType: 'string' },
    { name: 'excerpt', label: 'Excerpt', dataType: 'html' }
  ];
  tableData: any[];
  pagination: {
    perPage: number,
    currentPage: number,
    totalRows?: Subject<number>
  };

  constructor(private wordpressService: WordpressService) {}

  ngOnInit() {
    this.pagination = {
      perPage: 2,
      currentPage: 1,
      totalRows: new Subject<number>()
    };

    this.pagination.totalRows.next(0);
    this.wordpressService.getPostsCount().subscribe(rows => {
      this.pagination.totalRows.next(rows);
    });
    this.getPosts();
  }


  getPosts() {
    this.wordpressService.getPosts(this.pagination.perPage, this.pagination.currentPage).subscribe(posts => {
      this.tableData = posts;
    });
  }

  currentPageChanged(currentPage) {
    this.pagination.currentPage = currentPage;
    this.getPosts();
  }
}
