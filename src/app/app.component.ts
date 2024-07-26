import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { BodyComponent } from "./components/body/body.component";
import { CookiesComponent } from "./components/cookies/cookies.component";

interface SideBarToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [ RouterOutlet, SidebarComponent, BodyComponent, CookiesComponent ]
})
export class AppComponent {
  title = 'MetricHive';
  isSideBarCollapsed = false;
  screenWidth = 0;

  onToggleSideBar(data: SideBarToggle):void {
    this.screenWidth = data.screenWidth;
    this.isSideBarCollapsed = data.collapsed;
  }
}
