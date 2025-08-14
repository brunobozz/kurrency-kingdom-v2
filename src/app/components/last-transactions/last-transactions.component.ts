import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-last-transactions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './last-transactions.component.html',
  styleUrl: './last-transactions.component.scss'
})
export class LastTransactionsComponent implements OnInit {
  public list: any = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getLastTransactions();
  }

  public getLastTransactions() {
    this.apiService.getData('transaction').subscribe((res: any[]) => {
      this.list = res.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
    })
  }
}
