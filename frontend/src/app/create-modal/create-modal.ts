import { Component, inject, ChangeDetectorRef } from '@angular/core';

//Frontend Components
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { FormsModule } from '@angular/forms';

// Backend Classes
import { Data } from '../services/data';

//Angular Tools
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'create-modal',
  imports: [InputTextModule, PasswordModule, FormsModule, CommonModule ],
  templateUrl: './create-modal.html',
  styleUrl: './create-modal.css',
  standalone: true,

})
export class CreateModal {

  private router = inject(Router);

  constructor(private httpService: Data, private cdr: ChangeDetectorRef){}


  // Error Text to display problems
  errorText = '';

  form = {
    fname: '',
    lname: '',
    username: '',
    password: '',
    email: ''
  };



  goToLogin(){
    this.router.navigate(['/login']);
  }

  createAccount(){
    console.log(this.form);

    this.httpService.postRequest('/api/signup', this.form)
      .subscribe({
        next: (res) => this.goToLogin(),
        error: (err) => this.responseHandling(err)
      });
  }

  responseHandling(res: any){
    this.errorText = res.error.message;
    console.error("Error: ", this.errorText)
    this.cdr.detectChanges();
  }
}
