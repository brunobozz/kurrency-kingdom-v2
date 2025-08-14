import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-transactions-history-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './transactions-history-list.component.html',
  styleUrl: './transactions-history-list.component.scss'
})
export class TransactionsHistoryListComponent {
  @Input() list: any = [];
  @Output() callDetails = new EventEmitter<string>();

  public details(id: string) {
    this.callDetails.emit(id);
  }
}
