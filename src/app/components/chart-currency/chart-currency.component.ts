import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';



@Component({
  selector: 'app-chart-currency',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart-currency.component.html',
  styleUrl: './chart-currency.component.scss'
})
export class ChartCurrencyComponent {
  @Input() list: any[] = [];
  public viewList: any[] = [];

  private round2(n: number) {
    return Math.round(n * 100) / 100;
  }

  ngOnChanges(_: SimpleChanges) {
    const items = Array.isArray(this.list) ? this.list : [];
    const total = items.reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
    const max = items.reduce((m, i) => Math.max(m, Number(i.amount) || 0), 0);

    this.viewList = items.map((i) => {
      const percentOfTotal = total > 0 ? (Number(i.amount) / total) * 100 : 0;
      const heightPercent = max > 0 ? (Number(i.amount) / max) * 100 : 0;

      return {
        ...i,
        color: i.color,
        percentOfTotal: this.round2(percentOfTotal),
        heightPercent: this.round2(heightPercent),
      };
    });

    console.log(this.viewList)
  }
}