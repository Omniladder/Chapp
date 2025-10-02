import { Component, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { AddFriendDiv } from '../add-friend-div/add-friend-div';
import { Data } from '../services/data';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';


  type User = {
    id: number;
    username: string;
    fname: string;
    lname: string;
    isFoF: boolean;
  }

  type FriendsResponse = {
      data: User[]
  }

@Component({
  selector: 'add-friend-modal',
  imports: [AddFriendDiv, CommonModule, FormsModule],
  templateUrl: './add-friend-modal.html',
  styleUrl: './add-friend-modal.css'
})
export class AddFriendModal {

  @Output() queryCalled = new EventEmitter<void>();

  constructor(private httpService: Data, private cdr: ChangeDetectorRef, private authService: AuthService){}

  users: User[] = [];
  query: string = '';

  async ngOnInit(): Promise<void> {
    await this.getUsers();
  }

  async updateFrontend(){
    this.getUsers('');
    this.queryCalled.emit();
    console.log("Update Frontend Called");
  }

  async queryUsers(){
    await this.getUsers(this.query);
  }

  async getUsers(queryTerm?: string): Promise<void>{

  let hasQuery = true;
  if(this.query === ''){
    hasQuery = false;
  }

    await this.authService.checkSession();
    let res = await fetch('/api/findFriends', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchTerm: this.query,
        numberOfPeople: 35,
        hasSearchTerm: hasQuery
      })
    })

  if (!res.ok) {
    console.error('Bad HTTP status', res.status);
    console.error(await res.text()); // see the raw response
    return;
  }

    const json = (await res.json()) as FriendsResponse;
    this.users = json.data;
    this.query = '';
    this.cdr.detectChanges();

    console.log("Users ", this.users);
  }

  errorHandling(res: any){
    console.error(res);
  }


}
