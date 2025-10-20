import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';
import { Subscription } from 'rxjs';
import { DataService } from '../../core/data.service';
import { TemperatureValue } from '../../models/temperature.model';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, OnDestroy {
  private chart!: Chart;
  private dataSub?: Subscription;
  mode: 'realtime' | 'minute' = 'realtime'; 
  isLoading = false;
  minutes: any[] = []; 

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.initChart();
    this.startRealtime(); // modo inicial
  }

  private initChart(): void {
    this.chart = new Chart('realtime', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Temperatura °C',
            data: [],
            borderColor: '#42A5F5',
            borderWidth: 2,
            fill: false,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        animation: false,
        scales: {
          x: { title: { display: true, text: 'Hora' } },
          y: { title: { display: true, text: 'Temperatura (°C)' } },
        },
      },
    });
  }

  // --- MODO TIEMPO REAL ---
  private startRealtime(): void {
    this.dataSub?.unsubscribe(); // limpia
    this.chart.data.labels = [];
    this.chart.data.datasets[0].data = [];
    this.chart.update();

    this.dataSub = this.dataService.getTemperatureStream().subscribe({
      next: (data: TemperatureValue) => this.addPoint(data),
      error: (err) => console.error('Error SSE:', err),
    });
  }

  // --- MODO MINUTAL ---
private async loadMinuteData(): Promise<void> {
  this.isLoading = true;
  this.dataSub?.unsubscribe(); // limpia cualquier stream activo

  try {
    const minutesData = await this.dataService.getMinuteAverages().toPromise() ?? [];

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Crear un array de los próximos 15 minutos desde ahora
    const next15Minutes: { minute: string, avgC: number | null }[] = [];
    for (let i = 0; i < 15; i++) {
      const date = new Date();
      date.setMinutes(currentMinute + i);
      const label = date.getHours().toString().padStart(2,'0') + ':' + date.getMinutes().toString().padStart(2,'0');

      // Buscar si ya hay un promedio para ese minuto
      const found = minutesData.find((m: any) => m.minute === label);
      next15Minutes.push({ minute: label, avgC: found ? found.avgC : null });
    }

    // Actualizar el gráfico
    this.chart.data.labels = next15Minutes.map(m => m.minute);
    this.chart.data.datasets[0].data = next15Minutes.map(m => m.avgC);
    this.chart.update();

  } catch (err) {
    console.error('Error cargando promedios:', err);
  } finally {
    this.isLoading = false;
  }
}





  private addPoint(data: TemperatureValue): void {
    const now = new Date();
    const timeLabel = now.toLocaleTimeString('es-ES', { hour12: false });

    if (this.chart.data.labels!.length > 15) {
      this.chart.data.labels!.shift();
      this.chart.data.datasets[0].data.shift();
    }

    this.chart.data.labels!.push(timeLabel);
    this.chart.data.datasets[0].data.push(data.temperatureC);
    this.chart.update();
  }

  // --- CAMBIAR MODO ---
  changeMode(mode: 'realtime' | 'minute'): void {
  if (mode === 'realtime') this.startRealtime();
  else this.loadMinuteData();
}


  ngOnDestroy(): void {
    this.dataSub?.unsubscribe();
    this.chart?.destroy();
  }
}
