import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartCurrencyComponent } from '../chart-currency/chart-currency.component';
import { CurrencySelectorComponent } from '../currency-selector/currency-selector.component';
import { FormsModule } from '@angular/forms';
import { ApiKingdomService } from '../../services/api-kingdom/api-kingdom.service';
import { switchMap, forkJoin, map } from 'rxjs';


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
    private apiKingdom: ApiKingdomService,
  ) { }

  ngOnInit(): void {
    this.getCurrencyList();
  }

  private getCurrencyList() {
    this.apiKingdom.getData('currencies').subscribe((res: any) => {
      this.currencyList = res;
    })
  }

  public onCurrencySelected(currency: any) {
    this.selectedCurrency = currency;

    console.log(this.selectedCurrency);

    this.apiKingdom.getData('currencies').pipe(
      switchMap((list: any[]) =>
        forkJoin(
          list.map((c) =>
            this.apiKingdom.postData('currencies/convert-preview', {
              fromCode: currency.code,
              toCode: c.code,
              amount: 1,
            }).pipe(
              map((r: any) => ({
                toCode: r.toCode,
                name: c.name,
                code: c.code,
                color: c.color,
                rate: r.rate,
                result: r.result,
              }))
            )
          )
        )
      )
    ).subscribe((quotes) => {
      this.currentQuote = quotes;
      console.log(this.currentQuote)
    });
  }

}
