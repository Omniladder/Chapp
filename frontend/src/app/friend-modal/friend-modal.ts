import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'friend-modal',
  imports: [],
  templateUrl: './friend-modal.html',
  styleUrl: './friend-modal.css'
})
export class FriendModal {

  private router = inject(Router)



  // Data Variables

  @Input() id!: number;
  @Input() chain!: number;
  @Input() missedMessages!: number;
  @Input() fname!: string;
  @Input() lname!: string;
  @Input() username!: string;
  @Input() isFoF!: boolean;
  @Input() isRival!: boolean;
  @Input() isTop!: boolean;
  @Input() isBest!: boolean;
  @Input() isMutualBest!: boolean;
  achievements: String[] = []

  ngOnInit(){
    if(this.isMutualBest){
      this.achievements.push("Mutual Best Friends");
    }
    else if(this.isBest){
        this.achievements.push("Best Friend");
    }
    else if(this.isTop){
        this.achievements.push("Top Friend");
    }
    if(this.isRival){
        this.achievements.push("Rival Friend");
    }
    if(this.isFoF){
        this.achievements.push("Friend of a Friend");
    }
    console.log("Achievements: ", this.achievements)
  }


  get name(): string {
    return `${this.fname} ${this.lname}`;
  }

  openSettings(){

  }

  goToChat(){
    this.router.navigate(['/chat'], { queryParams: {friendID: this.id, friendUsername: this.username}});
  }

}
