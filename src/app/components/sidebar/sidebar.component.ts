import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
export class SidebarComponent implements OnInit { // Implements OnInit não funcionou

  @Output() onToggleSideBar: EventEmitter<SideBarToggle> = new EventEmitter();

  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  @HostListener('window: resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;

    if (this.screenWidth <= 768) {
      this.collapsed = false
      this.onToggleSideBar.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
    }
  }

  // Função abaixo não funcionou como deveria
  ngOnInit(): void {
      this.screenWidth = window.innerWidth;
  }

  // Até aqui, o restante funciona

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideBar.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
  }

  closeSidebar(): void {
    this.collapsed = false;
    this.onToggleSideBar.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
  } 
}
