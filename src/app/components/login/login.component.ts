import { Component, inject } from '@angular/core';
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

  #router = inject(Router)
  #apiService = inject(ApiDataService)

  onLoginSubmit() {
    // Implement your login logic here
    if (this.email === 'user@example.com' && this.password === 'password') {

    } else {
      // Handle login failure
    }
    this.#apiService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Handle the successful response here')
        this.#router.navigate([''])

      },
      (error) => {
        console.log('Handle login error here');
        
      }
    );
  
  }
}
