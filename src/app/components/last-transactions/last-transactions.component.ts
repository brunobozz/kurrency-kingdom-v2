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

  public limit: string = '5';
  public orderBy: string = 'createdAt';
  public order: string = 'DESC';
  public page: number = 1;

  constructor(private ApiKingdom: ApiKingdomService) { }

  ngOnInit(): void {
    this.getLastTransactions();
  }

  public getLastTransactions() {
    let params = `limit=${this.limit}&page=${this.page}&orderBy=${this.orderBy}&order=${this.order}`;
    this.ApiKingdom.getData(`transactions?${params}`).subscribe((res: any) => {
      this.list = res.data;
    })
  }
}
