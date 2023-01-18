import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  //secectedUser will be used inside to the template:
  constructor(public authService: AuthService) {}

  public onLogOut(): void {
    this.authService.logOut();
  }
}
