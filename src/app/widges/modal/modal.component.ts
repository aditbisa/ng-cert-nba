import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

export type ModalType = 'Ok' | 'YesNo' | 'ConfirmCancel';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() type: ModalType = 'Ok';
  @Output() responseEvent = new EventEmitter<string>();
  @Output() closeEvent = new EventEmitter();

  @ViewChild('primary', { static: false })
  set primaryButton(elm: ElementRef) {
    if (elm) setTimeout(() => elm.nativeElement.focus(), 100);
  }

  constructor() {}

  ngOnInit() {
    // console.log('Modal initialized', this.title, this.message, this.type);
  }

  ngOnDestroy() {
    // console.log('Modal destroyed');
  }

  response(answer: string) {
    this.responseEvent.emit(answer);
  }

  close(event?: any) {
    if (event && !event.target.classList.contains('modal-overlay')) return;
    this.closeEvent.emit();
  }
}
