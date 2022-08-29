import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { pipe, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  API_PIPE = `${environment.API_URI}`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  constructor(private http: HttpClient) {}

  // Get All Account API
  getAccounts(): Observable<any> {
    return this.http
      .get(this.API_PIPE + 'getalluser', this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // API Resource Response Error Handler
  errorHandler(error: any) {
    let errorCode = '';
    let errorMessage = '';
    errorCode = `${error.status}`;
    errorMessage = `Message: ${error.error.masseage}`;
    console.log(errorMessage);
    return throwError(errorCode);
  }
}
