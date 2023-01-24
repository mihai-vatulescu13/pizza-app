import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pizza-app';
  loadedFeature: string = 'recipe';

  onNavigate(event: any) {
    this.loadedFeature = event;
  }
}
