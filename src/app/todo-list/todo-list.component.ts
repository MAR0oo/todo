import {
  Component, inject, OnDestroy, OnInit,
} from '@angular/core';
import {Todo} from "../shared/interfaces/todo.interface";
import {TodoService} from "../core/services/todo.service";
import {Subscription} from "rxjs";
import {TodoApiService} from "../core/services/todo-api.service";

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
  // constructor(private todoService: TodoService, private todoApiService: TodoApiService) {}


  ngOnInit(): void {
    this.sub = this.todoService.todoChange.subscribe({
      next: todoList => this.todos = todoList
    });

    if (this.todos.length === 0) {
      this.todoApiService.getTodos().subscribe({
        next: todos => {
          // this.todos = todos;
        },
        error: err => {
          this.errorMessage = 'Wystąpił błąd spróbuj ponownie';
        }
      })
    }
  }

  addTodo(todo: string) : void {
    this.todoApiService.postTodo({name: todo, isComplete: false}).subscribe({
      error: err => {
        this.errorMessage = 'Wystąpił błąd spróbuj ponownie';
      }
    });
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
