import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() featureSelected = new EventEmitter();
  private onDestroy$ = new Subject();
  isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((userData) => {
        this.isAuthenticated = !!userData;
      });
  }

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

  public onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
