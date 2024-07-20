import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cookies',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './cookies.component.html',
  styleUrl: './cookies.component.scss',
})
export class CookiesComponent implements OnInit {
  consentGiven = false;

  ngOnInit(): void {
    this.consentGiven = this.getCookie('cookieConsent') === 'true';
  }

  acceptCookies(): void {
    this.setCookie('cookieConsent', 'true', 365);
    this.consentGiven = true;
  }

  rejectCookies(): void {
    this.setCookie('cookieConsent', 'false', 365);
    this.consentGiven = true;
  }

  closeBanner(): void {
    this.consentGiven = true;
  }

  setCookie(name: string, value: string, days: number): void {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + d.toUTCString();
    document.cookie = name + '=' + value + ';' + expires + ';path=/';
  }

  getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }

    return null;
  }
}
