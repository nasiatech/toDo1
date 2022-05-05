import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TodoItem} from "../models/todo.model";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

  form: FormGroup;

  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      title: new FormControl("", [Validators.required]),
      desc: new FormControl(""),
    })
    console.log(this.form)
  }

  ngOnInit(): void {
  }

  submitTodo() {
    const newTodo: TodoItem = {
      id: null,
      title:this.form.get("title")?.value,
      desc: this.form.get("desc")?.value,
      done: false,
    }
    console.log(newTodo)

    this.http.post("http://localhost:8080/todo", {
      "id": newTodo.id,
      "title": newTodo.title,
      "desc": newTodo.desc,
      "done" : newTodo.done
    }).subscribe((res) => {
      console.log(res)
    })
  }
}
