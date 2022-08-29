import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { pipe, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  API_PIPE = `${environment.API_URL}`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) { }

  postfile(data:any){
    return this.http
      .post(
        this.API_PIPE+'financialyearreportupload',
        data
        // JSON.stringify(),
        // this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  submitReport(data: any): Observable<any> {
    return this.http
      .post(
        this.API_PIPE+'financialyearreport',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }


  //Error Handler
  errorHandler(error: any) {
    let errorCode = '';
    let errorMessage = '';
    errorCode = `${error.status}`;
    errorMessage = `Message: ${error.error.message}`;
    console.log(errorMessage);
    return throwError(errorCode);
  }
}
