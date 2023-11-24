import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/api-data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  email: string = 'user@example.com';
  password: string = 'password';

  #router = inject(Router)
  #apiService = inject(ApiDataService)
  #httpClient = inject(HttpClient)

  signupForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  onSubmit() {
    console.log('signupForm', this.signupForm.value);

    this.#httpClient
      .post(
        'https://angular-cryptx-default-rtdb.europe-west1.firebasedatabase.app/users.json',
        this.signupForm.value
      )
      .subscribe(
        (response) => {
          console.log('response', response);
          this.signupForm.reset();
          this.#router.navigate(['../', 'login'], {
            // relativeTo: this.activatedRoute,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
