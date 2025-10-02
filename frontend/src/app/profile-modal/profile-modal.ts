import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { ConfirmationService } from 'primeng/api';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'profile-modal',
  imports: [ConfirmPopupModule],
  providers: [ConfirmationService],
  templateUrl: './profile-modal.html',
  styleUrl: './profile-modal.css'
})
export class ProfileModal {

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

  confirmDelete(event: Event) {
        this.confirmationService.confirm({
            target: event.currentTarget as EventTarget,
            message: 'Are you sure you want to delete your account?',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger'
            },
            accept: async () => {
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
            },
            reject: () => {
            }
        });
    }

}
