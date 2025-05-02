import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';          // ✅ Add this
import { CommonModule } from '@angular/common';        // ✅ Add this too
import { environment } from '../../environment';       // ✅ Already fixed this

@Component({
  selector: 'app-login',
  standalone: true,                                    // ✅ Ensure this is present
  imports: [CommonModule, FormsModule],                // ✅ Include FormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  loginStatus = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.post<any>(`${environment.apiUrl}/login`, {
      user: this.username,
      pass: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loginStatus = err.error.message || 'Login failed';
      },
    });
  }
}
