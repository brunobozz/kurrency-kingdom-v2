import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiKingdomService } from '../../../../../services/api-kingdom/api-kingdom.service';
import { ToastrService } from 'ngx-toastr';

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
  public loading = false;

  constructor(
    private apiKingdom: ApiKingdomService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers() {
    this.loading = true;
    this.apiKingdom.getData('users', true).subscribe((res: any) => {
      this.list = res;
      this.loading = false;
    })
  }

  public deleteUser(user: any) {
    this.loading = true;
    this.apiKingdom.deleteData('users/' + user.id, true).subscribe((res: any) => {
      this.getUsers();
      this.toastr.info(user.name, 'Usuário excluído!');
    this.loading = false;
  })
}
}
