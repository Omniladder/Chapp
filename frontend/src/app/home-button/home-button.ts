import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home-button',
  imports: [],
  templateUrl: './home-button.html',
  styleUrl: './home-button.css'
})
export class HomeButton {
  private router = inject(Router)

  goToHome(){
    this.router.navigate(['/home']);
  }

}
