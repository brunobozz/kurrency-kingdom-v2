import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CurrencyHeaderComponent } from './components/currency-header/currency-header.component';
import { CurrencyListComponent } from './components/currency-list/currency-list.component';

@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyHeaderComponent,
    CurrencyListComponent
  ],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss'
})
export class CurrencyComponent {

}
