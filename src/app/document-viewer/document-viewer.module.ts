import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleViewerComponent } from './google-viewer/google-viewer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [GoogleViewerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    GoogleViewerComponent
  ]
})
export class DocumentViewerModule { }
