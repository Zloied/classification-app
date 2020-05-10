import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';
import { error } from '@angular/compiler/src/util';
import { map } from 'rxjs/operators';
import { ClassificationResponse } from '../common/classification-response';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ClassificationService {

  private baseUrl = 'http://localhost:4567/classification';
  constructor(private httpClient: HttpClient) { }

  classifeImage(imageData: string): Observable<GetResponseClassification> {
    let resStat: string
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    // this.httpClient.post<any>(this.baseUrl, {data: imageData}, httpOptions).subscribe( response =>
    //  console.log(JSON.stringify(response)));

    console.log("sending data " + imageData);
    return this.httpClient.post<GetResponseClassification>(this.baseUrl, { data: imageData }, httpOptions);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

  };

  async detectFlowerClass(imageData: string): Promise<string[]> {
    let status: string;
    let message: string;
    let classNames: string[];
    let probability: number;

    //if (typeof className === 'undefined') {
    await this.classifeImage(imageData).toPromise().then(
      responseData => {
        console.log(JSON.stringify(responseData))


        status = responseData.status;
        probability = responseData.data[0].probability;

        if (status == "SUCCESS" ) {
          classNames = responseData.data.map(element=>element.className)
          console.log("inner " + responseData.data[0].className);
        }
      }
    );
    //}
    console.log("synsch " + classNames);

    return classNames;
  }
}
interface GetResponseClassification {
  status: string;
  massage: string;
  data: ClassificationResponse[]     
}