import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LatestValueComponent } from './components/latest-value/latest-value.component';
import { ChartComponent } from './components/chart/chart.component';

const routes: Routes = [
  { path: '', component: LatestValueComponent }, // raíz
  { path: 'chart', component: ChartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
