import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flower } from '../common/flower';
import { map } from 'rxjs/operators';
import { FlowerCategory } from '../common/flower-category';

@Injectable({
  providedIn: 'root'
})
export class FlowerService {

  private baseUrl = 'http://localhost:8080/api/flowers';
  private categoryUrl = 'http://localhost:8080/api/categories';

  constructor(private httpClient: HttpClient) { console.log("http client"); }

  getFlower(theFlowerId: number): Observable<Flower> {
    const flowerUrl = `${this.baseUrl}/${theFlowerId}`;

    return this.httpClient.get<Flower>(flowerUrl);
  }

  getFlowerListPaginate(thePage: number, thePageSize: number,
    theCategoryId: number): Observable<GetResponseFlowers> {

    const searchUrl = `${this.baseUrl}/search/findByCategory?id=${theCategoryId}`
                    + `&page=${thePage}&size=${thePageSize}`;
    console.log(" paged url " + searchUrl);
                    
    return this.httpClient.get<GetResponseFlowers>(searchUrl);
  }

  getFlowerList(theCategoryId: number): Observable<Flower[]> {

    const searchUrl = `${this.baseUrl}/search/findByCategory?id=${theCategoryId}`;
    return this.getFlowers(searchUrl);
  }

  searchFlowers(theKeyword: string): Observable<Flower[]> {
   
    
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    console.log("searching " + searchUrl);
    return this.getFlowers(searchUrl);
  }

  searchFlowersPaginate(thePage: number, thePageSize: number,
    theKeyword: string): Observable<GetResponseFlowers> {

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                    + `&page=${thePage}&size=${thePageSize}`;
    console.log(" paged url " + searchUrl);
                    
    return this.httpClient.get<GetResponseFlowers>(searchUrl);
  }

  private getFlowers(searchUrl: string): Observable<Flower[]> {
    return this.httpClient.get<GetResponseFlowers>(searchUrl).pipe(map(response => response._embedded.flowers));
  }

  getFlowerCategories(): Observable<FlowerCategory[]> {
    return this.httpClient.get<GetResponseFlowerCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.categories)
    );
  }

}

interface GetResponseFlowers {
  _embedded: {
    flowers: Flower[];
  }
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseFlowerCategory {
  _embedded: {
    categories: FlowerCategory[];
  }
}

