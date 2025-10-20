import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { TemperatureValue } from '../models/temperature.model';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // 🔹 base correcta con /api
  private baseUrl = 'https://meteologica-back-end.fly.dev/api';

  constructor(private ngZone: NgZone, private http: HttpClient) {}

  // 🔹 Tiempo real (usa /api/stream)
  getTemperatureStream(): Observable<TemperatureValue> {
    return new Observable(observer => {
      const evtSource = new EventSource(`${this.baseUrl}/stream`);
      evtSource.onmessage = (event) => {
        this.ngZone.run(() => {
          const data: TemperatureValue = JSON.parse(event.data);
          observer.next(data);
        });
      };
      evtSource.onerror = (err) => this.ngZone.run(() => observer.error(err));
      return () => evtSource.close();
    });
  }

  // 🔹 Promedios por minuto (usa /api/minutes)
  getMinuteAverages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/minutes`);
  }
}
