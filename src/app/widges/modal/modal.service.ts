import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';

import { ModalComponent, ModalType } from './modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private viewContainerRef!: ViewContainerRef;
  private componentRef!: ComponentRef<ModalComponent>;
  private modalSubject!: Subject<string>;

  constructor() {}

  setContainer(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

  show(
    title: string,
    message: string,
    type: ModalType = 'Ok'
  ): Promise<string> {
    this.componentRef = this.viewContainerRef.createComponent(ModalComponent);

    const modal = this.componentRef.instance;
    modal.title = title;
    modal.message = message;
    modal.type = type;
    modal.responseEvent.subscribe(this.response.bind(this));
    modal.closeEvent.subscribe(this.close.bind(this));

    this.modalSubject = new Subject<string>();
    return firstValueFrom(this.modalSubject.asObservable());
  }

  private response(answer: string) {
    this.modalSubject.next(answer);
    this.close();
  }

  close() {
    this.modalSubject.next('');
    this.modalSubject.complete();
    this.componentRef.destroy();
  }
}
