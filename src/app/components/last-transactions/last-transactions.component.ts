import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service/api.service';
import { RouterModule } from '@angular/router';
import { ApiKingdomService } from '../../services/api-kingdom/api-kingdom.service';

@Component({
  selector: 'app-last-transactions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './last-transactions.component.html',
  styleUrl: './last-transactions.component.scss'
})
export class LastTransactionsComponent implements OnInit {
  public list: any = [];

  constructor(private ApiKingdom: ApiKingdomService) { }

  ngOnInit(): void {
    this.getLastTransactions();
  }

  public getLastTransactions() {
    this.ApiKingdom.getData('transactions').subscribe((res: any) => {
      this.list = res.data;
    })
  }
}
