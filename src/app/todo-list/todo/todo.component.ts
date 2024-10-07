import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {Todo} from "../../shared/interfaces/todo.interface";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})

// implements OnChanges
export class TodoComponent{
  @Input() todo!: Todo;
  @Input() id!: number;
  @Input() i!: number;
  @Output() close = new EventEmitter<void>();
  @Output() changeStatus = new EventEmitter<number>();
  @ViewChild('li') li!: ElementRef;
  openModal = false;
  // timeout!: ReturnType<typeof setTimeout>;

  constructor(private router: Router, private route: ActivatedRoute) {}
  //
  // ngOnInit(): void {
  //   this.timeout = setTimeout(() => {
  //     console.log('setTimeout')
  //   }, 3000)
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes);
  // }
  //
  // ngDoCheck(): void {
  //   console.log("ngDoCheck");
  // }

  // ngAfterViewInit(): void {
  //   console.log(this.li);
  // }

  // ngOnDestroy(): void {
  //   console.log('test');
  //   clearTimeout(this.timeout);
  // }

  changeTodoStatus() {
    this.changeStatus.emit(this.id);
  }

  toggleModal() {
    this.openModal = !this.openModal;
  }

  deleteTodo() {
    this.close.emit();
  }

  navigateToDetails() {
    const navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      // state: { example: 'test' }
      // queryParams: {id: this.i, test: 'wartosc'}
    }
    this.router.navigate([this.id], navigationExtras);
  }
}
