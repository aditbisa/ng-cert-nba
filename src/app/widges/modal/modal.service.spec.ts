import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';
import { ModalComponent } from './modal.component';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [ModalService],
    });
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
