import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {CtaModel, ModalData} from "../models/modal.model";
import {DynamicComponent} from "../../models/dynamic-component.model";

@Component({
  selector: 'app-standard',
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StandardComponent implements AfterViewInit, DynamicComponent {

  @ViewChild('modalBody', { static: true }) modalBody!: ElementRef;
  @ViewChild('modalFooter', { static: true }) modalFooter!: ElementRef;
  @ViewChild('backdrop', { static: true }) backdrop!: ElementRef;
  @ViewChild('modal', { static: true }) modal!: ElementRef;
  data!: ModalData;

  constructor(
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    this.buildBody();
    this.buildFooterButtons();

    this.renderer.listen(this.backdrop.nativeElement, 'click', () => {
      // this.renderer.removeClass(this.modal.nativeElement, 'add');
      // this.renderer.removeClass(this.backdrop.nativeElement, 'add');
      this.data.onClose();
    });
  }

  private buildBody(): void {
    if (this.modalBody && this.data.bodyContent) {
      this.renderer.addClass(this.modal.nativeElement, 'add');
      this.renderer.addClass(this.backdrop.nativeElement, 'add');

      this.data.bodyContent instanceof Array
        ? this.data.bodyContent.forEach((ele) => this.renderer.appendChild(this.modalBody.nativeElement, ele))
        : this.renderer.appendChild(this.modalBody.nativeElement, this.renderer.createText(this.data.bodyContent));
    }
  }

  private buildFooterButtons(): void {
    this.data.callsToAction.forEach((cta) => {
      const button = this.styleBody(cta);
      this.styleFooter(cta, button);
    });
  }

  private styleBody(cta: CtaModel) {
    const button = this.renderer.createElement('button');
    this.renderer.appendChild(button, this.renderer.createText(cta.label));

    return button;
  }

  private styleFooter(cta: CtaModel, button: any): void {
    this.addFooterClasses(button, cta.type)
    this.renderer.appendChild(this.modalFooter.nativeElement, button);

    this.renderer.listen(button, 'click', (event) => {
      event.preventDefault();
      // this.renderer.removeClass(this.modal.nativeElement, 'add');
      // this.renderer.removeClass(this.backdrop.nativeElement, 'add');
      cta.action();
    });
  }

  private addFooterClasses(button: any, type: string): void {
    const width = this.data.callsToAction.length === 1 ? 'full-width' : 'haft-width';
    this.renderer.addClass(button, 'modal__action');
    this.renderer.addClass(button, width);
    switch (type) {
      case 'reject':
        this.renderer.addClass(button, 'reject-btn');
        break;

      case 'confirm':
        this.renderer.addClass(button, 'confirm-btn');
        break;

      case 'delete':
        this.renderer.addClass(button, 'delete-btn');
        break;
    }
  }

}
