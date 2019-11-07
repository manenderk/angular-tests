import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './charts/chart/chart.component';
import { TableComponent } from './tables/table/table.component';
import { TableContainerComponent } from './tables/table-container/table-container.component';
import { SimpleTableComponent } from './tables/simple-table/simple-table.component';


const routes: Routes = [
  {
    path: 'charts',
    component: ChartComponent
  },
  {
    path: 'tables',
    component: TableContainerComponent
  },
  {
    path: 'simple-table',
    component: SimpleTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
