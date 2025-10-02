import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Data } from '../services/data';

@Component({
  selector: 'login-modal',
  imports: [InputTextModule, PasswordModule, FormsModule],
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.css'
})
export class LoginModal {

  constructor(private httpService: Data, private cdr: ChangeDetectorRef){}

  private router = inject(Router)

  errorText = '';

  accountSignin = {
    username: '',
    password: ''
  }


  loginToAccount(){
    this.httpService.postRequest('/api/login', this.accountSignin)
      .subscribe({
        next: (res) => this.goToHome(),
        error: (err) => this.responseHandling(err)
      });
  }

  responseHandling(res: any){
    this.errorText = res.error.message;
    console.error("Error: ", this.errorText)
    this.cdr.detectChanges();
  }


  googleLogin(){
    window.location.href = '/api/google';
  }

  githubLogin(){
    window.location.href = '/api/github';
  }

  goToHome(){
   this.router.navigate(['/home']);
  }

  // Temporary Error WHen trying to OAuth before it gets setup
  OAuthError(){
    this.errorText = "OAuth Not Yet Avaliable please Login Manually";
    console.error("Error: Attempted OAuth Not yet Avalaliable")
    this.cdr.detectChanges();
  }

  goToCreate(){
    this.router.navigate(['/creation']);
  }
}
