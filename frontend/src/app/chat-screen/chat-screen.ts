import { Component , ChangeDetectorRef} from '@angular/core';
import { WebsiteHeader } from '../website-header/website-header';
import { HomeButton } from '../home-button/home-button';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';


type Message = {
  message: string;
  senderID: number;
  receiverID: number;
}

type MessageResponse = {
  data: Message[]
}

@Component({
  selector: 'app-chat-screen',
  imports: [WebsiteHeader, HomeButton, FormsModule, CommonModule],
  templateUrl: './chat-screen.html',
  styleUrl: './chat-screen.css'
})
export class ChatScreen {

  friendID!: number;
  friendUsername!: string;
  messageInput= '';
  messages!: Message[];

  constructor(private route: ActivatedRoute, private authService: AuthService, private cdr: ChangeDetectorRef) {
    this.route.queryParams.subscribe(params => {
      this.friendID = +params['friendID'];
      this.friendUsername = params['friendUsername'];
      console.log("Friend Username ", this.friendUsername)
    });
  }

  async ngOnInit(): Promise<void>{
    await this.getMessages();
  }


  async sendMessage(){
    if(this.messageInput != ''){
      await this.authService.checkSession();
      await fetch('/api/sendMessage', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receiverID: this.friendID,
          message: this.messageInput
      })
      })
      await this.getMessages();
      this.messageInput = '';
      this.cdr.detectChanges();
    }
  }

  async getMessages(){
    console.log("Getting Messages");

    await this.authService.checkSession();
    let res = await fetch('/api/getMessages', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        receiverID: this.friendID
      })
    })

    let json = (await res.json());
    this.messages = json.data as Message[];
    console.log("Json: ", json.data)
    this.cdr.detectChanges();
  }
}


