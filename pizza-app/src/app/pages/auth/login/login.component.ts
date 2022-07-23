import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class LoginComponent {
  constructor(private formBuilder: FormBuilder) {}

  public profileForm = this.formBuilder.group({
    email: [''],
    password: [''],
  });
}
