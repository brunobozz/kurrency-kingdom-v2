import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api-service/api.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  public list: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers() {
    this.apiService.getData('user').subscribe((res: any) => {
      this.list = res;
    })
  }
}
