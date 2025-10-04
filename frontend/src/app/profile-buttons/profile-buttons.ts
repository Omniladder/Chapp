import { Component, inject, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileModal } from '../profile-modal/profile-modal';
import { PopoverModule } from 'primeng/popover';
import { DialogModule } from 'primeng/dialog';
import { AddFriendModal } from '../add-friend-modal/add-friend-modal';


@Component({
  selector: 'profile-buttons',
  imports: [PopoverModule, ProfileModal, AddFriendModal],
  templateUrl: './profile-buttons.html',
  styleUrl: './profile-buttons.css'
})
export class ProfileButtons {
  private router = inject(Router)


  @Output() onAdd = new EventEmitter<void>();

  addTriggered(){
    this.onAdd.emit();
  }

  goToHome(){
    this.router.navigate(['/login']);
  }
}
