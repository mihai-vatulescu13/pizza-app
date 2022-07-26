import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    //get the users list form the API:
    this.authService.getUsersData();
    // if (this.router.url === '/auth/login') {
    // clear user data from the service
    // }
  }

  //get data from the form:
  public loginForm = this.formBuilder.group({
    email: [''],
    password: [''],
  });

  //later on make this code more clean by adding the http request into a service and use some method/s for login functionality:
  public onUserLogin(): void {
    this.authService.userLogin(this.loginForm.value);
  }
}
