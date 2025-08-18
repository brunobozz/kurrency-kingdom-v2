import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../services/api-service/api.service';
import { ApiKingdomService } from '../../services/api-kingdom/api-kingdom.service';

@Component({
  selector: 'app-transaction-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.scss'
})
export class TransactionDetailsComponent {
  public transaction: any;
  public loading = false;

  constructor(private apiKingdom: ApiKingdomService) { }

  public getTransaction(id: string) {
    this.loading = true;
    this.apiKingdom.getData('transactions/' + id, true).subscribe((res: any) => {
      this.transaction = res;
      this.loading = false;
      console.log(res);
    })
  }
}
