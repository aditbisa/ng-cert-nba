import { Component, ViewChild, ViewContainerRef } from '@angular/core';

import { ModalService } from './widges/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('modal', { read: ViewContainerRef })
  set modalContainer(modalContainerRef: ViewContainerRef) {
    this.modal.setContainer(modalContainerRef);
  }

  constructor(private modal: ModalService) {}
}
