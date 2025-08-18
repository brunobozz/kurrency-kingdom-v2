import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiKingdomService } from '../../../services/api-kingdom/api-kingdom.service';
import { ChartCurrencyComponent } from '../../../components/chart-currency/chart-currency.component';

@Component({
  selector: 'app-bank',
  standalone: true,
  imports: [
    CommonModule,
    ChartCurrencyComponent
  ],
  templateUrl: './bank.component.html',
  styleUrl: './bank.component.scss'
})
export class BankComponent implements OnInit {
  public list: any;
  public loading = false;

  constructor(private apiKingdom: ApiKingdomService) { }

  ngOnInit(): void {
    this.getBankVault();
  }

  public getBankVault() {
    this.loading = true;
    this.apiKingdom.getData('users/system', true).subscribe((res: any) => {
      this.list = res.balances;
      this.loading = false;
    })
  }
}
