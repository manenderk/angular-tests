import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { SharedModule } from '../shared/shared.module';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { BootstrapModule } from '../bootstrap/bootstrap.module';
import { TableContainerComponent } from './table-container/table-container.component';
import { EditableTableComponent } from './editable-table/editable-table.component';
import { FilterTablePipe } from './filter-table.pipe';
import { NumberToArrayPipe } from './number-to-array.pipe';
import { PaginateRowsPipe } from './paginate-rows.pipe';
import { EditableCellComponent } from './editable-cell/editable-cell.component';



@NgModule({
  declarations: [
    TableComponent,
    TableContainerComponent,
    EditableTableComponent,
    FilterTablePipe,
    NumberToArrayPipe,
    PaginateRowsPipe,
    EditableCellComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    Ng2TableModule,
    BootstrapModule
  ],
  providers: [
    FilterTablePipe
  ]
})
export class TablesModule { }
