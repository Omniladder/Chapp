import { Component, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ChangeDetectorRef } from '@angular/core';
import {EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'friend-settings-modal',
  imports: [DialogModule],
  templateUrl: './friend-settings-modal.html',
  styleUrl: './friend-settings-modal.css'
})
export class FriendSettingsModal {

    @Input() id!: number;

    @Output() onRemove = new EventEmitter<void>();

    constructor(private cdr: ChangeDetectorRef) {}

    showSetting = false;
    openSettings(){
      this.showSetting = true;
    }

    async removeFriend(){
      await fetch('/api/removeFriend', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        friendID: this.id,
      })
      });
      this.showSetting = false;
      this.cdr.detectChanges();
      this.onRemove.emit();
    }


}
