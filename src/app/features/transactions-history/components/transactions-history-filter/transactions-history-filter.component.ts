import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiKingdomService } from '../../../../services/api-kingdom/api-kingdom.service';

@Component({
  selector: 'app-transactions-history-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions-history-filter.component.html',
  styleUrl: './transactions-history-filter.component.scss'
})
export class TransactionsHistoryFilterComponent implements OnInit {
  @Output() sendFilter = new EventEmitter<any>();
  public currencyList: any;
  public filter = {
    term: '',
    date: '',
    currencyOrigin: '',
    currencyDestiny: '',
  }

  constructor(private apiKingdom: ApiKingdomService) { }

  ngOnInit(): void {
    this.getCurrencyList();
  }

  private getCurrencyList() {
    this.apiKingdom.getData('currencies').subscribe((res: any) => {
      this.currencyList = res;
    })
  }

  public filterList() {
    this.sendFilter.emit(this.filter);
  }
}
