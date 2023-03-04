import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pizza-app';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    //check if the user is stored or not when the app gets initalized:
    this.authService.autoLogin();
  }
}
