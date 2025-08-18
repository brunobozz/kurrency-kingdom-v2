import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        this.authService.setToken(res.access_token);
        window.location.href = '/';
        (err: any) => {
          this.toastr.error('Login inválido', 'Erro!')
          this.errorMessage = err.error.message || 'Login inválido';
        }
      }
    });
  }
}
