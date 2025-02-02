import { HttpClient, HttpHeaders, HttpRequest, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserSessionService } from '../data-services/auth/user-session.service';
import { jwtDecode } from "jwt-decode";
import { TokenClaims } from '../data-models/shared-models';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService<T> {
  defaultLang = 'en';
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private userSession: UserSessionService,
  ) { }

  public Post(destinationUrl: string, body?: any, options?: {}): Observable<T> {
    return this.request<T>('post', destinationUrl, body, options);
  }

  public Put(destinationUrl: string, body?: any, options?: {}): Observable<T> {
    return this.request<T>('put', destinationUrl, body, options);
  }

  public Get(destinationUrl: string, options?: {}): Observable<T> {
    return this.request<T>('get', destinationUrl, undefined, options);
  }

  public Delete(destinationUrl: string, options?: {}): Observable<T> {
    return this.request<T>('delete', destinationUrl, undefined, options);
  }

  private request<T>(method: string, url: string, body: any, options?: any): Observable<T> {
    return this.performRequest<T>(method, url, body, options);
  }

  private performRequest<T>(method: string, url: string, body: any, options?: any): Observable<T> {
    if (options == undefined) options = {};

    const savedLang = localStorage.getItem('lng') || this.defaultLang;
    let headers = options.headers || new HttpHeaders();
    headers = headers.set('Accept-Language', savedLang == 'ar' ? 'ar-SA' : 'en-US');

    const token = this.userSession.token();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    options.headers = headers;

    return new Observable((subscriber) => {
      this.httpClient.request<T>(new HttpRequest(method, url, body, options)).subscribe(
        (response: any) => {
          if (response.type == HttpEventType.Response) {
            subscriber.next(response.body);
          }
        },
        (error: any) => {
          if (!(error.error instanceof Blob)) {
            subscriber.error(error);
            
            if ( error.status === 401) {
              this.userSession.logout();
            }
          }
          if (error instanceof HttpErrorResponse && error.status === 401) {
            this.userSession.logout();
          }
        }
      );
    });
  }
}

