import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // console.log('the page state is:', this.authService.authPageState);
  }
}
