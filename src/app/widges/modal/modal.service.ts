import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { ModalComponent, ModalType } from './modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private componentRef!: ComponentRef<ModalComponent>;
  private modalSubject!: Subject<string>;

  constructor() {}

  show(
    viewContainerRef: ViewContainerRef,
    title: string,
    message: string,
    type: ModalType = 'Ok'
  ): Observable<string> {
    this.componentRef = viewContainerRef.createComponent(ModalComponent);

    const modal = this.componentRef.instance;
    modal.title = title;
    modal.message = message;
    modal.type = type;
    modal.responseEvent.subscribe(this.response.bind(this));
    modal.closeEvent.subscribe(this.close.bind(this));

    this.modalSubject = new Subject<string>();
    return this.modalSubject.asObservable();
  }

  private response(answer: string) {
    this.modalSubject.next(answer);
    this.close();
  }

  close() {
    this.modalSubject.complete();
    this.componentRef.destroy();
  }
}
