import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiKingdomService } from '../../../../../services/api-kingdom/api-kingdom.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-currency-list',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './currency-list.component.html',
  styleUrl: './currency-list.component.scss'
})
export class CurrencyListComponent implements OnInit {
  public list: any;
  public loading = false;

  constructor(
    private apiKingdom: ApiKingdomService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getCurrencies();
  }

  public getCurrencies() {
    this.loading = true;
    this.apiKingdom.getData('currencies', true).subscribe((res: any) => {
      this.list = res;
      this.loading = false;
    })
  }
  public saveFactor(currency: any, value: string) {
    this.apiKingdom.postData('currencies/rate', {
      "code": currency.code,
      "factorToBase": +value
    }, true).subscribe((res: any) => {
      this.toastr.info("Moeda: " + currency.name + " - $Or " + value, 'Valor base atualizado!');
    })
  }
}
