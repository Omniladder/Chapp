import { Component, Input, inject } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ChangeDetectorRef } from '@angular/core';
import {EventEmitter, Output} from '@angular/core';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'friend-settings-modal',
  imports: [DialogModule, ConfirmPopupModule],
  providers: [ConfirmationService],
  templateUrl: './friend-settings-modal.html',
  styleUrl: './friend-settings-modal.css'
})
export class FriendSettingsModal {

    @Input() id!: number;

    @Output() onRemove = new EventEmitter<void>();
    constructor(private cdr: ChangeDetectorRef, private confirmationService: ConfirmationService) {}

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
