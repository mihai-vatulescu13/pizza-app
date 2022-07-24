import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Login } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:3000/users').subscribe((res: any) => {
      this.usersData = res;
    });
  }

  public usersData: Login[] = [];

  //get data from the form:
  public loginForm = this.formBuilder.group({
    email: [''],
    password: [''],
  });

  //later on make this code more clean by adding the http request into a service and use some method/s for login functionality:
  public onLogin(): void {
    //check if there are users:
    if (this.usersData.length !== 0) {
      const currentUser: any = this.usersData.find(
        (user) => user.email === this.loginForm.value.email
      );
      // console.log(currentUser);

      if (
        currentUser.email === this.loginForm.value.email &&
        currentUser.password === this.loginForm.value.password
      ) {
        console.log('user connected with success!');
      } else {
        console.log('wrong credentials');
      }
    }
  }
}
