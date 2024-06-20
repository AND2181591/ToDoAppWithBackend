import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoItem } from '../interfaces/to-do-item';
import { ADD_TO_DO_ITEM_URL, DELETE_TO_DO_ITEM_URL, GET_TO_DO_LIST_URL, UPDATE_TO_DO_ITEM_URL } from '../constants/urls';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private http = inject(HttpClient);

  constructor() { }

  public getAllToDoItems(filterString?: string): Observable<ToDoItem[]> {
    filterString = filterString ? filterString : 'all'
    return this.http.get<ToDoItem[]>(GET_TO_DO_LIST_URL + filterString);
  }

  public addItem(item: ToDoItem): Observable<ToDoItem> {
    item.id = this.makeId();
    return this.http.post<ToDoItem>(ADD_TO_DO_ITEM_URL, item);
  }

  public editItem(item: ToDoItem): Observable<ToDoItem[]> {
    return this.http.put<ToDoItem[]>(UPDATE_TO_DO_ITEM_URL + item.id, item);
  }

  public deleteItem(item: ToDoItem): Observable<ToDoItem[]> {
    return this.http.delete<ToDoItem[]>(DELETE_TO_DO_ITEM_URL + item.id);
  }

  private makeId() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 10) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
}
