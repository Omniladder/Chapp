import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebsiteHeader } from '../website-header/website-header';
import { LoginModal } from '../login-modal/login-modal';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'login-screen',
  imports: [WebsiteHeader, LoginModal],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.css'
})
export class LoginScreen {
    constructor(private authService: AuthService){}

    async ngOnInit():Promise<void> {
      await this.authService.hasSession();
    }
}

