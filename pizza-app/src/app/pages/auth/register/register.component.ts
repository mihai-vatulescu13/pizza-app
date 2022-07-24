import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Register } from './register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class RegisterComponent {
  constructor(private formBuilder: FormBuilder) {}

  public profileForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    password: [''],
    city: [''],
  });

  public saveForm(): void {
    console.log('form data:', this.profileForm.value);
  }
}
