import { Component, inject, Input, TemplateRef} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'website-header',
  imports: [CommonModule],
  templateUrl: './website-header.html',
  styleUrl: './website-header.css'
})
export class WebsiteHeader {

  private router = inject(Router)

  @Input() rightSide?: TemplateRef<any>;
  @Input() showLogo?: boolean;


  goToHome(){
    this.router.navigate(['/home']);
  }

}
