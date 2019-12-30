import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsModule } from './charts/charts.module';
import { TablesModule } from './tables/tables.module';
import { LayoutsModule } from './layouts/layouts.module';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { SampleModulesModule } from './sample-modules/sample-modules.module';
import { DocumentViewerModule } from './document-viewer/document-viewer.module';
import { ExcelReaderModule } from './excel-reader/excel-reader.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    TablesModule,
    LayoutsModule,
    BootstrapModule,
    SharedModule,
    SampleModulesModule,
    DocumentViewerModule,
    ExcelReaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
