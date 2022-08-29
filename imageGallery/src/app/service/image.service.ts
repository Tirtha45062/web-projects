import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { pipe, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ImageService {
  API_PIPE = `${environment.FOLDER_URL}`;
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  constructor(private http: HttpClient) {}

  // Get Image API
  getImages(data:any): Observable<any> {
    return this.http
      .post(
        this.API_PIPE + 'image/getallimage',
       data,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  //Upload Image API
  uploadImage(data: any): Observable<any> {
    return this.http
      .post(this.API_PIPE + 'image', data, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  
   //Delete Image API
   deleteImage(data: any): Observable<any> {
    return this.http
      .delete(this.API_PIPE + 'image/'+data, this.httpOptions)
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
