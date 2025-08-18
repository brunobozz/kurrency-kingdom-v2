import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiKingdomService } from '../../services/api-kingdom/api-kingdom.service';

//COMPONENTS
import { FeatureHeaderComponent } from '../../components/feature-header/feature-header.component';
import { TransactionsHistoryFilterComponent } from './components/transactions-history-filter/transactions-history-filter.component';
import { TransactionsHistoryListComponent } from './components/transactions-history-list/transactions-history-list.component';
import { TransactionModalComponent } from '../../components/transaction-modal/transaction-modal.component';
import { TransactionsHistoryHeaderComponent } from './components/transactions-history-header/transactions-history-header.component';
import { ListPaginatorComponent } from '../../components/list-paginator/list-paginator.component';
import { TransactionDetailsComponent } from '../../components/transaction-details/transaction-details.component';

@Component({
  selector: 'app-transactions-history',
  standalone: true,
  imports: [
    CommonModule,

    //COMPONENTS
    FeatureHeaderComponent,
    TransactionsHistoryFilterComponent,
    TransactionsHistoryListComponent,
    TransactionModalComponent,
    TransactionsHistoryHeaderComponent,
    ListPaginatorComponent,
    TransactionDetailsComponent
  ],
  templateUrl: './transactions-history.component.html',
  styleUrl: './transactions-history.component.scss'
})
export class TransactionsHistoryComponent {
  public list: any[] = [];

  // paginação
  public limit: string = '10';
  public orderBy: string = 'createdAt';
  public order: string = 'DESC';
  public page: number = 1;
  public totalPages: number = 1;
  public totalItems: number = 0;
  public term: string = '';
  public date: string = '';
  public currencyOrigin: string = '';
  public currencyDestiny: string = '';

  constructor(private apiKingdom: ApiKingdomService) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  public getTransactions() {
    let params = `limit=${this.limit}&page=${this.page}&orderBy=${this.orderBy}&order=${this.order}&term=${this.term}&date=${this.date}&currencyOrigin=${this.currencyOrigin}&currencyDestiny=${this.currencyDestiny}`;
    this.apiKingdom.getData(`transactions?${params}`).subscribe((res: any) => {
      this.list = res.data;
      this.totalItems = res.total;
      this.totalPages = res.meta.totalPages;
    });
  }

  public changePage(page: number) {
    this.page = page;
    this.getTransactions();
  }

  // FILTERS
  public applyFilters(filters: any) {
    this.term = filters.term;
    this.date = filters.date;
    this.currencyOrigin = filters.currencyOrigin;
    this.currencyDestiny = filters.currencyDestiny;
    this.page = 1;
    this.getTransactions();
  }

  // // REORDER LIST (ordenar por coluna)
  // public reorderGames(column: string) {
  //   this.order =
  //     this.orderBy === column ? (this.order === 'ASC' ? 'DESC' : 'ASC') : 'ASC';
  //   this.orderBy = column;
  //   this.getUsers();
  // }
}