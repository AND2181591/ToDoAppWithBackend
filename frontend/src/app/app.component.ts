import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToDoItem } from './interfaces/to-do-item';
import { ToDoService } from './services/to-do.service';
import { Observable } from 'rxjs';
import { ItemComponent } from './item/item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  componentTitle = "My To Do List";

  filter: "all" | "active" | "done" = "all";

  allItems: ToDoItem[] = [];

  private toDoService = inject(ToDoService);

  ngOnInit(): void {
    this.getItems();
  }

  public getItems() {
    let itemsObservable: Observable<ToDoItem[]> = this.toDoService.getAllToDoItems();

    itemsObservable.subscribe(items => {
      this.allItems = items;
    });
  }

  public filterItems(filterString: string) {
    this.toDoService.getAllToDoItems(filterString).subscribe(newItemArr => {
      this.allItems = newItemArr;
    });
  }

  public addItem(description: string) {
    if (!description) return;

    const newItem: ToDoItem = { description: description, done: false };
    this.toDoService.addItem(newItem).subscribe(res => {
      this.allItems.push(res);
    });
  }

  public editItem(item: ToDoItem) {
    this.toDoService.editItem(item).subscribe(newItemArr => {
      this.allItems = newItemArr;
    });
  }

  public deleteItem(item: ToDoItem) {
    this.toDoService.deleteItem(item).subscribe(newItemArr => {
      this.allItems = newItemArr;
    });
  }
}
