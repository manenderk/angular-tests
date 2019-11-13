import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GreetUserComponent } from './greet-user/greet-user.component';
import { SampleModulesContainerComponent } from './sample-modules-container/sample-modules-container.component';



@NgModule({
  declarations: [GreetUserComponent, SampleModulesContainerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    GreetUserComponent
  ]
})
export class SampleModulesModule { }
