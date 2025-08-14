import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../services/api-service/api.service';

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
    text: '',
    date: null,
    currencyOrigin: null,
    currencyDestiny: null,
  }

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getCurrencyList();
  }

  private getCurrencyList() {
    this.apiService.getData('currency').subscribe((res: any) => {
      this.currencyList = res;
    })
  }

  public filterList() {
    this.sendFilter.emit(this.filter);
  }
}
