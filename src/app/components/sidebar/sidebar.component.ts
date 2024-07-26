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
  imports: [ CommonModule, RouterModule ],
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
    this.handleResizeEvents(); 
  }

  private handleResizeEvents(): void {
    fromEvent(window, 'resize').pipe(throttleTime(500)).subscribe(() => this.updateSidebarState());
  }
  
  private updateSidebarState(): void {
    this.screenWidth = window.innerWidth;
    this.collapsed = this.screenWidth <= 768;
    this.emitSidebarToggleEvent();
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideBar.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidebar(): void {
    this.collapsed = false;
    this.onToggleSideBar.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  private emitSidebarToggleEvent(): void {
    this.onToggleSideBar.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }
}
