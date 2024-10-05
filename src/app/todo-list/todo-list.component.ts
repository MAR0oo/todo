import {
  Component, inject, OnDestroy, OnInit,
} from '@angular/core';
import {Todo} from "../shared/interfaces/todo.interface";
import {TodoService} from "../core/services/todo.service";
import {Subscription} from "rxjs";
import {TodoApiService} from "../core/services/todo-api.service";
import {subscribe} from "node:diagnostics_channel";


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
// implements AfterViewInit, AfterViewChecked
export class TodoListComponent implements OnInit, OnDestroy{
  todoService = inject(TodoService);
  todoApiService = inject(TodoApiService)
  todos: Todo[] = this.todoService.getTodos;
  errorMessage = '';
  sub !: Subscription;

  constructor() {}


  ngOnInit(): void {
    this.sub = this.todoService.todoChange.subscribe({
      next: todoList => {this.todos = todoList}
    });

    if (this.todos.length === 0) {
      this.todoApiService.getTodos().subscribe({
        next: todos => {
          // console.log(todos)
          this.todos = todos;
        }
      })
    }
  }

  addTodo(todo: string) : void {
    if(todo.length <= 3){
      this.errorMessage = 'Zadanie powinno mieć co najmniej 4 znaki';
      return;
    }
    this.todoService.addTodo(todo);
    // this.todos = this.todoService.getTodos;
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }

  deleteTodo(i: number) {
    this.todoService.deleteTodo(i);
  }

  changeToDoStatus(index: number) {
    this.todoService.changeToDoStatus(index);
  }

  clearAllTodos() {
    this.todoService.clearAllTodos();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
