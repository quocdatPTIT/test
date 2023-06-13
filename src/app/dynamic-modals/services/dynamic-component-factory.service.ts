import {ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';
import {DynamicItem} from "../models/dynamic-item";
import {DynamicComponent} from "../models/dynamic-component.model";
import {ComponentConfig} from "../models/component-config.model";

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentFactoryService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  createDynamicComponent(vcr: ViewContainerRef, dynamicItem: DynamicItem): void {
    if (dynamicItem.component) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(dynamicItem.component);
      const componentRef = vcr.createComponent(componentFactory);
      (componentRef.instance as DynamicComponent).data = dynamicItem.data;
    }
  }

  buildDynamicItem(componentConfig: ComponentConfig): DynamicItem {
    return new DynamicItem(componentConfig.dynamicComponentType, componentConfig.data);
  }
}
