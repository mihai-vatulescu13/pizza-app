import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/services/user-data.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public selectedUser: User | any = {};
  constructor(private location: Location, public authService: AuthService) {}

  ngOnInit(): void {
    console.log('incoming data to the home page:', this.location.getState());
    this.selectedUser = this.location.getState();
  }
}
