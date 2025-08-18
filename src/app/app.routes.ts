import { Routes } from '@angular/router';

// GUARDS
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guars';

// FEATURES OPEN
import { LoginComponent } from './features/login/login.component';

// FEATURES GUARD
import { HomeComponent } from './features/home/home.component';
import { TransactionsHistoryComponent } from './features/transactions-history/transactions-history.component';
import { ProfileComponent } from './features/profile/profile.component';

// FEATURES ADMIN
import { AdminComponent } from './features/admin/admin.component';
import { UserComponent } from './features/admin/user/user.component';
import { CurrencyComponent } from './features/admin/currency/currency.component';
import { BankComponent } from './features/admin/bank/bank.component';

// ERROR ROUTES
import { NotFoundComponent } from './features/not-found/not-found.component';
import { AccessDeniedComponent } from './features/access-denied/access-denied.component';


export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent,
    data: { showHeader: true, showFooter: true },
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { showHeader: true, showFooter: true },
    canActivate: [authGuard]
  },
  {
    path: 'transactions-history',
    component: TransactionsHistoryComponent,
    data: { showHeader: true, showFooter: true },
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    data: { showHeader: true, showFooter: true },
    canActivate: [authGuard, adminGuard],
    children: [
      {
        path: 'user',
        component: UserComponent,
        data: { showHeader: true, showFooter: true },
      },
      {
        path: 'currency',
        component: CurrencyComponent,
        data: { showHeader: true, showFooter: true },
      },
      {
        path: 'bank',
        component: BankComponent,
        data: { showHeader: true, showFooter: true },
      },
      {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: 'access-denied',
    component: AccessDeniedComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },

  { path: '**', redirectTo: 'not-found' },
];
