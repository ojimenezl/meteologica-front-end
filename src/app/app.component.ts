import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LatestValueComponent } from './components/latest-value/latest-value.component';
import { ChartComponent } from './components/chart/chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LatestValueComponent, ChartComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}
