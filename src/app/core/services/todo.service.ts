import { Injectable } from '@angular/core';
import {Todo} from "../../shared/interfaces/todo.interface";
import {Subject} from "rxjs";
import {describe} from "node:test";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

 private _todos: Todo[] = [];
 todoChanged = new Subject<Todo[]>();

 constructor() {}

  // constructor() {
    // Sprawdź czy localStorage jest dostępny
    // if (typeof localStorage !== 'undefined') {
    //   // this._todos = JSON.parse(localStorage.getItem('todos')!) ?? [];
    //   this._todos = [];
    // }
  // }

  public get todos() {
    return this._todos.slice();
  }

  public set todos(arrTodos: Todo[]) {
    this._todos = [...arrTodos];
    this.todoChanged.next(this.todos);
  }

  addTodo(todo: Todo) : void {
    this._todos.push(todo);
    this.todoChanged.next(this.todos);
  }

  deleteTodo(id: number) {
    this._todos = this.todos.filter((todo, index) => todo.id !== id)
    this.todoChanged.next(this.todos);
  }

  changeTodoStatus(id: number, isComplete: boolean) {
    const searchTodo = this.todos.find(todo => todo.id === id)
    if(searchTodo){
      searchTodo.isComplete = isComplete;
    }
    this.todoChanged.next(this.todos);
  }

  // saveToLocalStorage(): void {
  //   localStorage.setItem('todos', JSON.stringify(this.todos));
  // }
}
