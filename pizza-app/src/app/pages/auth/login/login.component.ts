import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.authService.getUsersData();
  }

  public usersData: Login[] = [];

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
