import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authToken: string | null = null;
  private readonly firebaseApiUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBYUxdj9AE5EldG9xN36eRrca5Ogiy0zNE';

  httpClient = inject(HttpClient)

  setToken(token: string | null) {
    this.authToken = token;
  }

  getToken(): string | null {
    return this.authToken || localStorage.getItem('authToken');
  }

  isAuthenticated(): Observable<boolean> {
    // Check if the token is present and not expired (you may need to implement token expiration logic)
    return of(this.getToken() !== null);
  }

  login(email: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password)
      .set('returnSecureToken', 'true');

    return this.httpClient.post(this.firebaseApiUrl, null, { params });
  }
}
