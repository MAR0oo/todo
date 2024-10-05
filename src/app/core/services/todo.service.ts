import { Injectable } from '@angular/core';
import {Todo} from "../../shared/interfaces/todo.interface";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
 private _todos: Todo[] = [];
 todoChange = new Subject<Todo[]>();

  constructor() {
    // Sprawdź czy localStorage jest dostępny
    if (typeof localStorage !== 'undefined') {
      // this._todos = JSON.parse(localStorage.getItem('todos')!) ?? [];
      this._todos = [];
    }
  }

  public set todos(arrTodos: Todo[]) {
    this._todos = [...arrTodos];
    this.todoChange.next(this.todos);
  }

  public get getTodos() {
    return this._todos.slice();
  }

  getTodo(index: number): Todo | undefined {
    return this.getTodos[index];
  }

  addTodo(todo: string) : void {
    // this._todos.push({name: todo, isComplete: false});
    this.saveToLocalStorage();
    this.todoChange.next(this.getTodos);
  }

  deleteTodo(i: number) {
    this._todos = this.getTodos.filter((todo, index) => index !== i);
    this.saveToLocalStorage();
    this.todoChange.next(this.getTodos);
  }

  changeToDoStatus(index: number) {
    this._todos[index] = {
      ...this.getTodos[index],
      isComplete: !this.getTodos[index].isComplete
    };
    this.saveToLocalStorage();
    this.todoChange.next(this.getTodos);
  }

  clearAllTodos() {
    this._todos = [];
    this.saveToLocalStorage();
    this.todoChange.next(this.getTodos);
  }

  saveToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.getTodos));
  }
}
