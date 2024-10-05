import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() errorMessage!: string;
  @Output() clearMessage = new EventEmitter<void>();
  @Input() showButton = false;

  clearErrorMessage() {
    this.clearMessage.emit();
  }
}
