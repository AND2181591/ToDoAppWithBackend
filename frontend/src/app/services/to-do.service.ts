import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoItem } from '../interfaces/to-do-item';
import { ADD_TO_DO_ITEM_URL, GET_TO_DO_LIST_URL } from '../constants/urls';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private http = inject(HttpClient);

  constructor() { }

  public getAllToDoItems(): Observable<ToDoItem[]> {
    return this.http.get<ToDoItem[]>(GET_TO_DO_LIST_URL);
  }

  public addItem(item: ToDoItem): Observable<ToDoItem> {
    return this.http.post<ToDoItem>(ADD_TO_DO_ITEM_URL, item);
  }
}
