import {ModalData} from "../modals/models/modal.model";
import {AlertData} from "../alerts/models/alert.model";

export interface ComponentConfig {
  dynamicComponentType: any;
  data: ModalData | AlertData;
}
