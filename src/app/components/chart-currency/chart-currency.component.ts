import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart-currency',
  standalone: true,
  imports: [],
  templateUrl: './chart-currency.component.html',
  styleUrl: './chart-currency.component.scss'
})
export class ChartCurrencyComponent {
  @Input() gold = 1000;
  @Input() tibar = 1000;

  get goldPercent(): number {
    const total = this.gold + this.tibar;
    return total > 0 ? (this.gold / total) * 100 : 0;
  }

  get tibarPercent(): number {
    const total = this.gold + this.tibar;
    return total > 0 ? (this.tibar / total) * 100 : 0;
  }
}
