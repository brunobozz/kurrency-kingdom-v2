import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserHeaderComponent } from './components/user-header/user-header.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    UserHeaderComponent,
    UserListComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

}
