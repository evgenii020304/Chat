import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../modules/material.module';

@Component({
  selector: 'app-username-modal',
  standalone: true,
  imports: [FormsModule, MaterialModule],
  templateUrl: './username-modal.component.html',
  styleUrls: ['./username-modal.component.css']
})
export class UsernameModalComponent {
  username = '';
  @Output() usernameSet = new EventEmitter<string>();

  saveName() {
    if (this.username.trim()) {
      this.usernameSet.emit(this.username.trim());
    }
  }
}
