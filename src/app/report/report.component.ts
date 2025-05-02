import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token || '');

    this.http.get<any>(`${environment.apiUrl}/report`, { headers }).subscribe({
      next: (data) => {
        const labels = data.chart2.data.map((d: any) => d.category);
        const values = data.chart2.data.map((d: any) => d.amount);

        new Chart('pieChart', {
          type: 'pie',
          data: {
            labels,
            datasets: [{
              label: 'Donation Distribution',
              data: values,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
            }]
          }
        });
      },
      error: (err) => {
        console.error('Error loading chart2 data', err);
      }
    });
  }
}
