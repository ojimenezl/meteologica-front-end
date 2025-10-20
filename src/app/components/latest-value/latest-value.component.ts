import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/data.service';
import { TemperatureValue } from '../../models/temperature.model';

@Component({
  selector: 'app-latest-value',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './latest-value.component.html',
})
export class LatestValueComponent implements OnInit {
  latestData?: TemperatureValue;
  localTime: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getTemperatureStream().subscribe({
      next: (data) => {
        this.latestData = data;

        // Generar hora local igual que en la gráfica
        const now = new Date();
        this.localTime = now.toLocaleTimeString('es-ES', { hour12: false });

        console.log("Dato recibido:", this.latestData);
        console.log("Hora local:", this.localTime);
        console.log("Temperatura °C:", this.latestData.temperatureC);
        console.log("Valor bruto:", this.latestData.rawValue);
      },
      error: (err) => console.error('Error al obtener datos:', err)
    });
  }
}
