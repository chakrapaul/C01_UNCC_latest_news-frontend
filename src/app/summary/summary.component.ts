import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token || '');

    this.http.get<any>(`${environment.apiUrl}/report`, { headers }).subscribe({
      next: (data) => {
        const labels = data.chart1.data.map((d: any) => d.date);
        const values = data.chart1.data.map((d: any) => d.amount);

        new Chart('lineChart', {
          type: 'line',
          data: {
            labels,
            datasets: [{
              label: 'Donations ($)',
              data: values,
              borderColor: 'blue',
              fill: false
            }]
          }
        });
      },
      error: (err) => {
        console.error('Error loading chart1 data', err);
      }
    });
  }
}
