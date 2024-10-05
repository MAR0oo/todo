import {Component, EventEmitter, Output} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrl: './add-todo-form.component.css'
})
export class AddTodoFormComponent {
  @Output() addTodo = new EventEmitter<string>();
  todoName = '';
  // person = {name: 'test', surname: 'testowy', role: 'father'}

  addNewTodo() {
    // console.log(this.person)
    this.addTodo.emit(this.todoName);
  }


}
