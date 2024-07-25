import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, HeaderComponent ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getBodyClass(): string {
    if (this.collapsed) {
      if (this.screenWidth > 768) {
        return 'body-trimmed';
      } else if (this.screenWidth <= 768 && this.screenWidth > 0) {
        return 'body-md-trimmed';
      }
    }

    return ''
  }
}
