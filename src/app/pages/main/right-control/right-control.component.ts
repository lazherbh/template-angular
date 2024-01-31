import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoComponent } from './todo/todo.component';

@Component({
  selector: 'app-right-control',
  templateUrl: './right-control.component.html',
  styleUrls: ['./right-control.component.css']
})
export class RightControlComponent implements OnInit {
	@ViewChild(TodoComponent) public todoList: TodoComponent;
  	constructor() { }

	ngOnInit(): void {
  	}

	public add(title: string): void { 
		this.todoList.add(title)
	}
}
