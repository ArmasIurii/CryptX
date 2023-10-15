import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = 'user@example.com';
  password: string = 'password';

  #router = inject(Router)

  onLoginSubmit() {
    // Implement your login logic here
    if (this.email === 'user@example.com' && this.password === 'password') {
      this.#router.navigate([''])

    } else {
      // Handle login failure
    }
  }
}
