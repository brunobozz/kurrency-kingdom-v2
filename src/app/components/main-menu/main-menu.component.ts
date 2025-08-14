import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss'
})
export class MainMenuComponent {
  public opened: boolean = false;
  public menu: any = [
    {
      title: "Home",
      icon: "mdi-home",
      route: '/'
    },
    {
      title: "Histórico de Transaçãoes",
      icon: "mdi-history",
      route: '/transactions-history'
    }
  ]

  constructor(
    private router: Router
  ) { }

  public openMenu() {
    this.opened = true;
  }

  public closeMenu() {
    this.opened = false;
  }

  isActive(route: string): boolean {
    return this.router.url == route;
  }

}
