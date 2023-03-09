import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  message: string;
  close = new EventEmitter<void>();

  public onClose(): void {
    this.close.emit();
  }
}
