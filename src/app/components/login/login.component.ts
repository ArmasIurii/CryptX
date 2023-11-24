import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/api-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = 'user@example.com';
  password: string = 'password';
  private firebaseApiUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBYUxdj9AE5EldG9xN36eRrca5Ogiy0zNE';


  #router = inject(Router)
  #apiService = inject(ApiDataService)
  #httpClient = inject(HttpClient)


  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  onLoginSubmit(loginForm: FormGroup) {
    const { email, password } = loginForm.value;

    const params = new HttpParams()
      .set('email', email)
      .set('password', password)
      .set('returnSecureToken', 'true');

    this.#httpClient
      .post(this.firebaseApiUrl, null, { params })
      .subscribe(
        (response: any) => {
          // User authenticated successfully
          const token = response.idToken;
          console.log(token);

          sessionStorage.setItem('token', token)

          // Save the token in localStorage or a secure storage
          localStorage.setItem('authToken', token);

          // Redirect to home or desired page
          this.#router.navigate(['/']);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
