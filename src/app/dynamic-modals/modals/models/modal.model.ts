export interface ModalData {
  header: string;
  headerAlign?: string;
  modalSize?: string;
  bodyContent: any;
  onClose: () => void;
  callsToAction: Array<CtaModel>;
}

export interface CtaModel {
  label: string;
  type: 'reject' | 'confirm' | 'delete';
  action: () => void;
}
