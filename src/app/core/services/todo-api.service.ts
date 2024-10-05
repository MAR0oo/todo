import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Todo} from "../../shared/interfaces/todo.interface";
import {TodoService} from "./todo.service";

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  constructor(private http: HttpClient, private todoService: TodoService) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:3000/todo').pipe(
      tap((todos) => this.todoService.todos = todos)
    );
  }

}
