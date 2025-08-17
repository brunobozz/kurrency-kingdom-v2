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

  constructor(private apiKingdom: ApiKingdomService) { }

  ngOnInit(): void {
    this.getBankVault();
  }

  public getBankVault() {
    this.apiKingdom.getData('users/system', true).subscribe((res: any) => {
      console.log(res);
      this.list = res.balances;
    })
  }
}
