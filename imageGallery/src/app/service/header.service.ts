import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { pipe, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  API_PIPE = `${environment.API_URI}`;
  API_PIPI2=`${environment.FOLDER_URL}`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  httpOptions2 = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  constructor(private http: HttpClient) {}

  // Get profile API
  getProfile(): Observable<any> {
    return this.http
      .get(this.API_PIPE + 'editprofileget', this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  // Update profile API
  updateProfile(data: any): Observable<any> {
    return this.http
      .put(
        this.API_PIPE + 'editprofilepost',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

   //Upload Profile Image API
   profileImage(data: any): Observable<any> {
    return this.http
      .post(this.API_PIPI2 + 'image/profilepic', data, this.httpOptions2)
      .pipe(catchError(this.errorHandler));
  }


//Get Profile Image API
getProfilePic(): Observable<any> {
  return this.http
    .get(this.API_PIPI2 + 'user/getprofilepic', this.httpOptions)
    .pipe(catchError(this.errorHandler));
}

  // Logout API
  logout(): Observable<any> {
    return this.http
      .delete(this.API_PIPE + 'logout', this.httpOptions)
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
