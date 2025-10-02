import { Component } from '@angular/core';
import { WebsiteHeader } from '../website-header/website-header';
import { CreateModal } from '../create-modal/create-modal'

@Component({
  selector: 'create-screen',
  imports: [ WebsiteHeader, CreateModal],
  templateUrl: './create-screen.html',
  styleUrl: './create-screen.css'
})
export class CreateScreen {

}
