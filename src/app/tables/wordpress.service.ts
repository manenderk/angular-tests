import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {

  private siteAdd = 'http://www.deevsi.com/';

  constructor(private httpClient: HttpClient) { }

  getPosts(postPerPage = 0, currentPage = 0) {
    let query = 'wp-json/wp/v2/posts';

    if (postPerPage > 0 && currentPage > 0) {
      query = query + `?page=${currentPage}&per_page=${postPerPage}`;
    }
    // return this.httpClient.get<any[]>(this.siteAdd + query);

    return this.httpClient.get<any[]>(
      this.siteAdd + query
    ).pipe(
      map(response => {
        return response.map(post => {
          return {
            id: post.id,
            date: post.date,
            link: post.link,
            title: post.title.rendered,
            excerpt: post.excerpt.rendered
          };
        });
      })
    );
  }

  getPostsCount() {
    const query = 'wp-json/wp/v2/posts';
    return this.httpClient.get<any[]>(
      this.siteAdd + query
    ).pipe(
      map(response => {
        return response.length;
      })
    );
  }

}
