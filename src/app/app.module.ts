import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { FooterComponent } from './footer/footer.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { AddTodoFormComponent } from './todo-list/add-todo-form/add-todo-form.component';
import { TodoComponent } from './todo-list/todo/todo.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import localePL from '@angular/common/locales/pl';
import { registerLocaleData } from "@angular/common";
import { FirstLetterPipePipe } from './shared/pipes/first-letter-pipe.pipe';
import { FormsModule } from "@angular/forms";
import { FirstLetterDirective } from './shared/validators/first-letter.directive';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { ChildAComponent } from './todo-list/child-a/child-a.component';
import { ChildBComponent } from './todo-list/child-b/child-b.component';
import {HttpClientModule} from "@angular/common/http";

registerLocaleData(localePL);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TodoListComponent,
    FooterComponent,
    AlertComponent,
    AddTodoFormComponent,
    TodoComponent,
    ModalComponent,
    FirstLetterPipePipe,
    FirstLetterDirective,
    HomeComponent,
    PageNotFoundComponent,
    TodoDetailsComponent,
    ChildAComponent,
    ChildBComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
  providers: [
    provideClientHydration(),
    { provide: LOCALE_ID, useValue: 'pl' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
