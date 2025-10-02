import { ChangeDetectorRef, Component, Output } from '@angular/core';
import { WebsiteHeader } from '../website-header/website-header';
import { ProfileButtons } from '../profile-buttons/profile-buttons';
import { FriendModal } from '../friend-modal/friend-modal';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

type Connection = {
  missedMessages: number;
  streak: number;
  user2: Friend;

  isFoF: boolean;
  isRival: boolean;
  isTop: boolean;
  isBest: boolean;
  isMutualBest: boolean;
}

type Friend = {
  fname: string;
  lname: string;
  username: string;
  id: number;
}

@Component({
  selector: 'app-home-screen',
  imports: [WebsiteHeader, ProfileButtons, FriendModal, CommonModule],
  templateUrl: './home-screen.html',
  styleUrl: './home-screen.css'
})
export class HomeScreen {

  constructor(private cdr: ChangeDetectorRef, private authService: AuthService){}

  //Friend Information
  friendName!: string;
  numMissed!: number;
  currentChain!: number;
  achievements!: string[];

  friends! : Connection[];


  async ngOnInit():Promise<void> {
    await this.getFriends();
  }

  async getFriends(){

    await this.authService.checkSession();

    let response = await fetch('/api/getFriends',{
      method: 'GET',
      credentials: 'include'
    })

    if (!response.ok) throw new Error('Failed to load friends');

    let json = (await response.json());
    this.friends = json.data || [];
    this.cdr.detectChanges();
  }

}




