import { NgComponentOutlet } from '@angular/common';
import { Component, EventEmitter, Input, Output, Type } from '@angular/core';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-popup-component',
  imports: [NgComponentOutlet],
  templateUrl: './popup-component.html',
  styleUrl: './popup-component.scss',
})
export class PopupComponent {
  @Output() closed = new EventEmitter();
  @Input() message!: string;
  @Input() component!: Type<any>;

  close() {
    this.closed.emit();
  }
}
