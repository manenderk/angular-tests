import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { SharedModule } from '../shared/shared.module';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { BootstrapModule } from '../bootstrap/bootstrap.module';
import { TableContainerComponent } from './table-container/table-container.component';
import { EditableTableComponent } from './editable-table/editable-table.component';
import { TableGlobalFilterPipe } from './table-global-filter.pipe';



@NgModule({
  declarations: [TableComponent, TableContainerComponent, EditableTableComponent, TableGlobalFilterPipe],
  imports: [
    CommonModule,
    SharedModule,
    Ng2TableModule,
    BootstrapModule
  ]
})
export class TablesModule { }
