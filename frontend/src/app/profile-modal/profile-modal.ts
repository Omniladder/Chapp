import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { ConfirmationService } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'profile-modal',
  imports: [ConfirmPopupModule, DialogModule],
  providers: [ConfirmationService],
  templateUrl: './profile-modal.html',
  styleUrl: './profile-modal.css'
})
export class ProfileModal {

  showProfile=false;
  constructor(private confirmationService: ConfirmationService, private authService: AuthService) {}
  private router = inject(Router)

  async logout(){
    await this.authService.checkSession();
    await fetch('/api/logout', {
      method: 'DELETE',
      credentials: 'include'
    });

    this.router.navigate(['/login']);
  }

  openModal() {
    this.showProfile=true;
  }
  closeModal() {
    this.showProfile=false;
  }

  async deleteAccount() {
    await this.authService.checkSession();
    let response = await fetch('/api/delete', {
      method: 'DELETE',
      credentials: 'include'
    });

    if(response.ok){
      this.router.navigate(['/login']);
    }
    else{
      console.error("Delete Failed ", response.status);
      console.error(response);
    }
  }
}



