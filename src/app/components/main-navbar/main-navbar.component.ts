import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-main-navbar',
  standalone: true,
  imports: [
    CommonModule,
    ThemeSwitcherComponent
  ],
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.scss'
})
export class MainNavbarComponent {

}
