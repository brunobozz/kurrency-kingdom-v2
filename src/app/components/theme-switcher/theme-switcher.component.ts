import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [],
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnInit {

  currentTheme: 'dark' | 'light' = 'dark';

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      this.currentTheme = savedTheme;
    } else {
      const theme = document.documentElement.getAttribute('data-bs-theme');
      this.currentTheme = (theme === 'light') ? 'light' : 'dark';
    }
    document.documentElement.setAttribute('data-bs-theme', this.currentTheme);
  }

  toggleTheme(): void {
    this.currentTheme = (this.currentTheme === 'dark') ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
  }
}
