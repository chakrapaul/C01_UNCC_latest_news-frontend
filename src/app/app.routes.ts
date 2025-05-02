import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SummaryComponent } from './summary/summary.component';
import { ReportComponent } from './report/report.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route
  { path: 'login', component: LoginComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'report', component: ReportComponent },
  { path: 'dashboard', component: DashboardComponent }
];

// Add this in your app.config.ts if needed:
// export const appConfig: ApplicationConfig = {
//   providers: [provideRouter(routes)]
// };
