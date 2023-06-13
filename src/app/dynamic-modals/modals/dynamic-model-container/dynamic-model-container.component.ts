import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DynamicContainerSelectorDirective} from "../../directives/dynamic-container-selector.directive";
import {Subject} from "rxjs";
import {ConfigurationService} from "../../services/configuration.service";
import {takeUntil, tap} from "rxjs/operators";
import {ComponentConfig} from "../../models/component-config.model";

@Component({
  selector: 'app-dynamic-model-container',
  template: `<ng-container appDynamicContainerSelector></ng-container>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicModelContainerComponent implements OnInit, OnDestroy {
  @ViewChild(DynamicContainerSelectorDirective, {static: true})
  containerSelector!: DynamicContainerSelectorDirective;

  private destroy: Subject<void> = new Subject();
  constructor(
    private configService: ConfigurationService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const { viewContainerRef } = this.containerSelector;

    this.configService.loadComponent$.pipe(
      takeUntil(this.destroy),
      tap((componentConfig: ComponentConfig) => {
        if (componentConfig.dynamicComponentType) {
          this.cdr.markForCheck();
          this.configService.loadComponent(viewContainerRef, componentConfig)
        }
      })
    ).subscribe();

    this.configService.destroyComponent$.pipe(
      takeUntil(this.destroy),
      tap(() => viewContainerRef.clear())
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
