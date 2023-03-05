import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-number-days',
  template: `
    <select (change)="onChange($event)">
      <option
        [value]="val"
        [attr.selected]="val == value ? true : null"
        *ngFor="let val of options"
      >
        {{ val }}
      </option>
    </select>
  `,
  styles: [],
  standalone: true,
  imports: [CommonModule],
})
export class NumberDaysComponent {
  @Input() options: number[] = [6, 12, 20];
  @Input() value: number = 12;
  @Output() valueChange = new EventEmitter<number>();
  @Input() emitDefault: boolean = true;

  constructor() {}

  ngOnInit() {
    if (this.emitDefault) {
      this.valueChange.emit(this.value);
    }
  }

  onChange(event: any) {
    this.valueChange.emit(Number(event.target.value));
  }
}
