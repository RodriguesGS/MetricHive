import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { navbarData } from './nav-data';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

interface SideBarToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  @Output() onToggleSideBar: EventEmitter<SideBarToggle> = new EventEmitter();

  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;

    fromEvent(window, 'resize').pipe(
      throttleTime(500)
    ).subscribe(event => this.onResize(event))
    
  }

  onResize(event: Event): void {
    this.screenWidth = window.innerWidth;
  
    if (this.screenWidth <= 768) {
      this.collapsed = true;
    } else {
      this.collapsed = false;
    }
    this.onToggleSideBar.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideBar.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidebar(): void {
    this.collapsed = false;
    this.onToggleSideBar.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }
}
