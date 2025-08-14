import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

//COMPONENTS
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { CurrentQuoteComponent } from '../../components/current-quote/current-quote.component';
import { LastTransactionsComponent } from '../../components/last-transactions/last-transactions.component';
import { TransactionModalComponent } from '../../components/transaction-modal/transaction-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CarouselComponent,
    CurrentQuoteComponent,
    LastTransactionsComponent,
    TransactionModalComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
