import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ConfigurationService} from "./dynamic-modals/services/configuration.service";
import {ComponentConfig} from "./dynamic-modals/models/component-config.model";
import {StandardComponent} from "./dynamic-modals/modals/standard/standard.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'mb-modal';
  constructor(private modalService: ConfigurationService) {}

  confirm1() {
    console.log('Xin chào 123');
  }

  triggerStandardModal(event: Event): void {
    event.preventDefault();
    const modalData: ComponentConfig = {
      dynamicComponentType: StandardComponent,
      data: {
        header: 'TITLE POPUP MB BANK',
        bodyContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum, dui et interdum posuere, orci libero sodales magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum, dui et interdum posuere, orci libero sodales magna.',
        onClose: () => this.modalService.destroyComponent(),
        callsToAction: [{
          label: 'Xoá',
          action: () => this.modalService.destroyComponent(),
          type: 'delete'
        }, {
          label: 'Xác nhận',
          action: () => this.confirm1(),
          type: 'confirm'
        }]
      }
    };
    this.modalService.dispatchComponent(modalData);
  }
}
