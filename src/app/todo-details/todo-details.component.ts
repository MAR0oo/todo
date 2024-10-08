import {Component, OnInit} from '@angular/core';
import {Todo} from "../shared/interfaces/todo.interface";
import {TodoService} from "../core/services/todo.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {switchMap} from "rxjs";
import {TodoApiService} from "../core/services/todo-api.service";

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.css'
})
export class TodoDetailsComponent implements OnInit{

  todo: Todo | undefined;
  id!: number;

  constructor(
    private todoService: TodoService,
    private todoApiService: TodoApiService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    // this.id = +this.route.snapshot.params['id'];
    // this.todo = this.todoService.getTodo(this.id);

    // this.route.params.subscribe(params => {
    //   this.id = +params['id'];
    //   this.todo = this.todoService.getTodo(this.id);
    //   console.log(params);
    // })

    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      // this.todo = this.todoService.getTodo(this.id);
    })

    this.route.paramMap.pipe(
      switchMap((params) => this.todoApiService.getTodo(Number(params.get('id'))))
    ).subscribe({
      next: value => {
        console.log(value)
      },
      error: err => {
        console.log(err)
      }
    })

    // console.log(
    //   this.location.getState()
    // )

    // this.route.queryParams.subscribe(params => {
    //   console.log(params);
    // })
  }

  navigateToNextTodo() {
    this.router.navigate(['/todo', this.id + 1]);
  }

  navigateBack() {
    this.location.back();
  }
}
