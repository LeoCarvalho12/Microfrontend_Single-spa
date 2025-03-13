import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private path: any;

  constructor(@Inject(HttpClient) private http: HttpClient) {
    this.path = environment.apiUrl;
  }

  login(email: string, senha: string) {
    return this.http.post(`${this.path}/login`, { email, senha });
  }

  private handleError(error: any) {
    const errMsg = error.message 
      ? error.message 
      : error.status 
        ? `${error.status} - ${error.statusText}` 
        : 'Server error';
    console.error(errMsg);
    return of(errMsg);
  }
}
