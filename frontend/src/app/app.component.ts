import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToDoItem } from './interfaces/to-do-item';
import { ToDoService } from './services/to-do.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
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
    // if (this.filter === "all") {
    //   this.toDoService.getAllToDoItems();
    //   return this.allItems;
    // }
    // return this.allItems.filter((item) =>
    //   this.filter === "done" ? item.done : !item.done
    // );
  }

  public addItem(description: string) {
    if (!description) return;

    const newItem: ToDoItem = { description: description, done: false };
    this.toDoService.addItem(newItem).subscribe(res => {
      this.allItems.push(res);
    });
  
    // this.allItems.unshift({
    //   description,
    //   done: false
    // });
  }
}
