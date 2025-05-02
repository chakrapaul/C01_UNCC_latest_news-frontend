import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  loginStatus = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.post<any>(
      `${environment.apiUrl}/login`,
      {
        user: this.username,
        pass: this.password
      },
      {
        withCredentials: true  // ✅ Enables cookie/token handling for CORS
      }
    ).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loginStatus = err.error.message || 'Login failed';
      }
    });
  }
}
