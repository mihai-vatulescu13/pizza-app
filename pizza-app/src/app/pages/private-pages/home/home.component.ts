import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/services/user-data.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //secectedUser will be used inside to the template:
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // console.log('incoming data to the home page:', this.location.getState());
    //check if the user is connected: (!this.authService.isLoggedIn$)
    // console.log(!this.authService.isLoggedIn$);
    if (!this.authService.isLoggedIn$) {
      this.router.navigateByUrl('');
    }
    console.log('current navigation:', this.router.url);
  }

  public onLogOut(): void {
    this.authService.logOut();
  }
}
