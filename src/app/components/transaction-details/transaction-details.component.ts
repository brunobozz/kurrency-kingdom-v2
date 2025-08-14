import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../services/api-service/api.service';

@Component({
  selector: 'app-transaction-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.scss'
})
export class TransactionDetailsComponent {
  public transaction: any;

  constructor(private apiService: ApiService) { }

  public getTransaction(id: string) {
    this.apiService.getData('transaction/' + id).subscribe((res: any) => {
      this.transaction = res;
    })
  }
}
