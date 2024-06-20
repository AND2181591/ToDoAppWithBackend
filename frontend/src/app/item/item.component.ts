import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDoItem } from '../interfaces/to-do-item';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  editable = false;

  @Input() item!: ToDoItem;
  @Output() checked = new EventEmitter<ToDoItem>();
  @Output() delete = new EventEmitter<ToDoItem>();
  @Output() edit = new EventEmitter<ToDoItem>();

  saveItem(description: string) {
    if (!description) return;

    this.editable = false;
    this.item.description = description;
    this.edit.emit(this.item);
  }

  checkItem() {
    this.item.done = !this.item.done;
    this.checked.emit(this.item);
  }

}
