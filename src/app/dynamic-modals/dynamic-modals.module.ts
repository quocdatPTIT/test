import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicContainerSelectorDirective } from './directives/dynamic-container-selector.directive';
import { DynamicModelContainerComponent } from './modals/dynamic-model-container/dynamic-model-container.component';
import { StandardComponent } from './modals/standard/standard.component';

@NgModule({
  declarations: [
    DynamicContainerSelectorDirective,
    DynamicModelContainerComponent,
    StandardComponent
  ],
  exports: [
    DynamicModelContainerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DynamicModalsModule { }
