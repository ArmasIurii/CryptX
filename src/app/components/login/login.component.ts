import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = 'user@example.com';
  password: string = 'password';

  #router = inject(Router)
  #authService = inject(AuthService)

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  onLoginSubmit(loginForm: FormGroup) {
    const { email, password } = loginForm.value;

    this.#authService.login(email, password).subscribe(
      (response: any) => {
        // User authenticated successfully
        const token = response.idToken;
        console.log(token);

        // Save the token in the AuthService
        this.#authService.setToken(token);

        // Save the token in sessionStorage or localStorage if needed
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
