import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cookies',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './cookies.component.html',
  styleUrl: './cookies.component.scss',
})
export class CookiesComponent {
  consentGiven = false;

  acceptCookies(): void {
    this.consentGiven = true;
  }

  rejectCookies(): void {
    this.consentGiven = true;
  }

  closeBanner(): void {
    this.consentGiven = true;
  }

}
