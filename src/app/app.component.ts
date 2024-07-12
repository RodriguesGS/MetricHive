import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { BodyComponent } from "./components/body/body.component";
interface SideBarToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, SidebarComponent, BodyComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',   
})
export class AppComponent {
  title = 'MetricHive';

  isSideBarCollapsed = false;
  screenWidth = 0;

  onToggleSideBar(data: SideBarToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideBarCollapsed = data.collapsed;
  }
}
