import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownDirective } from '../../derectives/bs-dropdown.directive';

@Component({
  selector: 'app-currency-selector',
  standalone: true,
  imports: [CommonModule, BsDropdownDirective],
  templateUrl: './currency-selector.component.html',
  styleUrl: './currency-selector.component.scss'
})
export class CurrencySelectorComponent implements OnChanges {
  @Input() list: any;
  public selectedCurrency: any;
  @Output() currencyChange = new EventEmitter<any>();

  ngOnChanges(): void {
    if (this.list && !this.selectedCurrency) {
      this.changeCurrency(this.list.find((item: any) => { return item.code == 'Tb' }));
    }
  }

  public changeCurrency(currency: any) {
    this.selectedCurrency = currency;
    this.currencyChange.emit(currency);
  }

}
