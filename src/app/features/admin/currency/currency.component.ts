import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CurrencyListComponent } from './components/currency-list/currency-list.component';

@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyListComponent
  ],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss'
})
export class CurrencyComponent {

}
