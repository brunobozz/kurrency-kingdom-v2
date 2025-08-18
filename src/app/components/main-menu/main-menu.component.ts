import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeSwitcherComponent],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss'
})
export class MainMenuComponent {
  public opened: boolean = false;
  public user: any;
  public menu: any = [
    {
      title: "Home",
      icon: "mdi-home",
      route: '/',
      isAdmin: false
    },
    {
      title: "Histórico de Transaçãoes",
      icon: "mdi-history",
      route: '/transactions-history',
      isAdmin: false
    },
    {
      title: "Usuários",
      icon: "mdi-account-group",
      route: '/admin/user',
      isAdmin: true
    },
    {
      title: "Moedas",
      icon: "mdi-currency-usd",
      route: '/admin/currency',
      isAdmin: true
    },
    {
      title: "Banco",
      icon: "mdi-bank",
      route: '/admin/bank',
      isAdmin: true
    }
  ]

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.menu = this.menu.filter((it: any) => !it.isAdmin || this.user?.isAdmin);
  }

  public openMenu() {
    this.opened = true;
  }

  public closeMenu() {
    this.opened = false;
  }

  isActive(route: string): boolean {
    return this.router.url == route;
  }

  public logout() {
    this.authService.logout();
    this.opened = false;
  }

}
