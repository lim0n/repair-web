import { NgComponentOutlet } from '@angular/common';
import { Component, Input, Type } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [ NgComponentOutlet ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() title!: string;
  @Input() content!: Type<any>;
}
