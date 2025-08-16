import { Routes } from '@angular/router';

//FEATURES
import { HomeComponent } from './features/home/home.component';
import { TransactionsHistoryComponent } from './features/transactions-history/transactions-history.component';
import { CurrencyComponent } from './features/currency/currency.component';
import { UserComponent } from './features/user/user.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'transactions-history',
    component: TransactionsHistoryComponent,
  },
  {
    path: 'currency',
    component: CurrencyComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
];
