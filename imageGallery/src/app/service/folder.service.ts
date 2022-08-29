import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { pipe, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class FolderService {
  API_PIPE = `${environment.FOLDER_URL}`;
  API_ALL_IMAGE = `${environment.API_URI}`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  constructor(private http: HttpClient) {}
  // Get folder API
  getFolders(): Observable<any> {
    return this.http
      .get(this.API_PIPE + 'gallery', this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  //Create Folder API
  createFolder(data: any): Observable<any> {
    return this.http
      .post(this.API_PIPE + 'gallery', JSON.stringify(data), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  getAllImage(): Observable<any> {
    return this.http
      .get(this.API_ALL_IMAGE + 'getalluserimage', this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  deleteFolder(data: any): Observable<any> {
    return this.http
      .delete(this.API_PIPE + 'gallery/'+ data, this.httpOptions)
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
