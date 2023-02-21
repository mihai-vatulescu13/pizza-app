import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public navToRoute(route: string, e: any): void {
    e.preventDefault();
    this.router.navigate([route]);
  }
}
