import { Routes } from '@angular/router';

//FEATURES
import { HomeComponent } from './features/home/home.component';
import { TransactionsHistoryComponent } from './features/transactions-history/transactions-history.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'transactions-history',
    component: TransactionsHistoryComponent,
  },
];
