import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TodoItem} from "../models/todo.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  todoItems: TodoItem[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<TodoItem[]>("http://localhost:8080/todo")
      .subscribe((res: TodoItem[]) => {
        console.log(res)
        this.todoItems = res;

      });

  }

  deleteTodo(id: number) {
    const confirmDelete: boolean = confirm("Are you sure you want to delete this item?");

    if(confirmDelete) {
      this.http.delete(`http://localhost:8080/todo/${id}`)
        .subscribe((res) => {
          console.log(res);
        })
    }
  }
}
