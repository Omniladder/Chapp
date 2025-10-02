import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);

  // Function Designed to send user back login if no longer has session
  async checkSession(): Promise<void>{
      let response = await fetch('/api/isExpired', {
        method: 'GET',
        credentials: 'include'
      });

      if(response.status != 200){
        this.router.navigate(['/login']);
      }
  }

  async hasSession(): Promise<void>{
       let response = await fetch('/api/isExpired', {
        method: 'GET',
        credentials: 'include'
      });

      if(response.status == 200){
        this.router.navigate(['/home']);
      }

  }
}

