import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../services/api-service/api.service';

//COMPONENTS
import { FeatureHeaderComponent } from '../../components/feature-header/feature-header.component';
import { TransactionsHistoryFilterComponent } from './components/transactions-history-filter/transactions-history-filter.component';
import { TransactionsHistoryListComponent } from './components/transactions-history-list/transactions-history-list.component';
import { TransactionModalComponent } from '../../components/transaction-modal/transaction-modal.component';
import { TransactionsHistoryHeaderComponent } from './components/transactions-history-header/transactions-history-header.component';
import { ListPaginatorComponent } from '../../components/list-paginator/list-paginator.component';

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
    ListPaginatorComponent
  ],
  templateUrl: './transactions-history.component.html',
  styleUrl: './transactions-history.component.scss'
})
export class TransactionsHistoryComponent {
  public list: any[] = [];
  public filteredList: any[] = [];

  // paginação
  public pagedList: any[] = [];
  public page = 1;
  public pageSize = 5;
  public totalPages = 1;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  public getTransactions() {
    this.apiService.getData('transaction').subscribe((res: any[]) => {
      this.list = (res ?? []).sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });

      this.filteredList = [...this.list];
      this.page = 1;
      this.updatePaging();
    });
  }

  public filterList(filter: {
    text?: string;
    date?: string | null;
    currencyOrigin?: string | null;
    currencyDestiny?: string | null;
  }) {
    this.filteredList = this.list.filter((item: any) => {
      if (filter.text) {
        const t = filter.text.toLowerCase();
        if (
          !item.id.toLowerCase().includes(t) &&
          !item.user.toLowerCase().includes(t)
        ) return false;
      }

      if (filter.date) {
        const filtroData = new Date(filter.date).toISOString().slice(0, 10);
        const itemData = new Date(item.createdAt).toISOString().slice(0, 10);
        if (itemData !== filtroData) return false;
      }

      if (filter.currencyOrigin) {
        if (item.currencyOrigin.code !== filter.currencyOrigin) return false;
      }

      if (filter.currencyDestiny) {
        if (item.currencyDestiny.code !== filter.currencyDestiny) return false;
      }

      return true;
    });

    // sempre resetar para a 1ª página após filtrar
    this.page = 1;
    this.updatePaging();
  }

  // chamado pelo seu <app-list-paginator (onPageChange)="changePage($event)">
  public changePage(p: number) {
    this.page = Math.max(1, Math.min(p, this.totalPages));
    this.updatePaging();
  }

  // --- helpers ---
  private updatePaging() {
    this.totalPages = Math.max(1, Math.ceil(this.filteredList.length / this.pageSize));
    const start = (this.page - 1) * this.pageSize;
    this.pagedList = this.filteredList.slice(start, start + this.pageSize);
  }
}