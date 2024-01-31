import { getTodayTime, ONE_DAY } from 'src/utils/time';
import { floorToDate } from './../../../../../../utils/time';
import { TodoService } from 'src/app/services/todo/todo.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/domain/entities';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.css']
})
export class SuggestComponent implements OnInit {
	public suggestedTodo: Todo[] = [];
	private todo$: Subscription;
	constructor(
		private todoService: TodoService
	  ) { }

	ngOnInit(): void {
		this.todo$ = this.todoService.todo$.subscribe(todos => { 
			const todoArr = todos.filter(t => { 
				if (t.planAt && floorToDate(t.planAt) <= getTodayTime()) { 
					return false;
				}
				if (t.dueAt && t.dueAt - getTodayTime() <= ONE_DAY * 2) { return true; }
        		return false;
			})
			this.suggestedTodo = [].concat(todoArr);
		})
		this.todoService.getAll();
	}
	
	ngOnDestroy(): void {
		this.todo$.unsubscribe();
	}

	public setTodoToday(todo: Todo): void { 
		this.todoService.setTodoToday(todo._id)
	}

}
