import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartCurrencyComponent } from '../chart-currency/chart-currency.component';
import { CurrencySelectorComponent } from '../currency-selector/currency-selector.component';
import { ApiService } from '../../services/api-service/api.service';
import { CurrentQuoteService } from '../../services/current-quote.service/current-quote.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-current-quote',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ChartCurrencyComponent,
    CurrencySelectorComponent,
  ],
  templateUrl: './current-quote.component.html',
  styleUrl: './current-quote.component.scss'
})
export class CurrentQuoteComponent implements OnInit {
  public currencyList: any;
  public selectedCurrency: any;
  public currentQuote: any;
  public value = 1;

  constructor(
    private apiService: ApiService,
    private currentQuoteService: CurrentQuoteService
  ) { }

  ngOnInit(): void {
    this.getCurrencyList();
  }

  private getCurrencyList() {
    this.apiService.getData('currency').subscribe((res: any) => {
      this.currencyList = res;
    })
  }

  onCurrencySelected(currency: any) {
    this.getCurrencyList();
    this.selectedCurrency = currency;
    this.currentQuote = this.currentQuoteService.getQuote(this.currencyList, currency.code);
  }

}
