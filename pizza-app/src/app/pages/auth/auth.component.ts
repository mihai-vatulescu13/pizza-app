import { Component, OnInit } from '@angular/core';
import { AuthPageState } from './auth.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public authPageState: AuthPageState = AuthPageState.Login;

  constructor() {}

  ngOnInit(): void {}
}
