import { Component, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'friend-settings-modal',
  imports: [DialogModule],
  templateUrl: './friend-settings-modal.html',
  styleUrl: './friend-settings-modal.css'
})
export class FriendSettingsModal {

    @Input() id!: number;

    showSetting = false;
    openSettings(){
      this.showSetting = true;
    }

    removeFriend(){
      console.log("Removing Friend ", this.id);
    }


}
