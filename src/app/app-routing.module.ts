import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './charts/chart/chart.component';
import { TableComponent } from './tables/table/table.component';
import { TableContainerComponent } from './tables/table-container/table-container.component';


const routes: Routes = [
  {
    path: 'charts',
    component: ChartComponent
  },
  {
    path: 'tables',
    component: TableContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
