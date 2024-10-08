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

  todos: Todo[] = this.todoService.todos;
  errorMessage = '';
  sub !: Subscription;

  constructor() {}
  // constructor(private todoService: TodoService, private todoApiService: TodoApiService) {}


  ngOnInit(): void {
    this.sub = this.todoService.todoChanged.subscribe({
      next: todoList => this.todos = todoList
    });

    if (this.todos.length === 0) {
      this.todoApiService.getTodos().subscribe({
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
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }

  deleteTodo(id: number) {
    this.todoApiService.deleteTodo(id).subscribe({
      error: err => {
        this.errorMessage = 'Wystąpił błąd spróbuj ponownie';
      }
    })
  }

  changeTodoStatus(id: number, todo: Todo) {
    this.todoApiService.patchTodo(id, {isComplete: !todo.isComplete}).subscribe({
      error: err => {
        this.errorMessage = 'Wystąpił błąd spróbuj ponownie';
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
