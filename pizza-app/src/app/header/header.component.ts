import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from '../shared/services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter();

  constructor(
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {}

  public navToRoute(route: string, e: any): void {
    e.preventDefault();
    this.router.navigate([route]);
  }

  public onSaveRecipes() {
    this.dataStorageService.saveRecipes();
  }

  public onFetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
