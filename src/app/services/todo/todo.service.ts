import { floorToMinute, getCurrentTime, ONE_HOUR } from './../../../utils/time';
import { TODOS } from './../local-stroage.namespace';
import { ListService } from './../list/list.service';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { RankBy, Todo } from 'src/domain/entities';
import { LocalStroageService } from '../local-stroage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
	public todo$ = new Subject<Todo[]>();
	public rank$ = new Subject<RankBy>();
	public completedHide$ = new Subject<boolean>();
	public todos: Todo[] = [];
	private rank: RankBy = 'title';
	private completedHide = false;

	constructor(
		private listService: ListService,
		private store: LocalStroageService) { 
		this.todos = this.store.getList(TODOS)
	}
	
	private broadCast(): void { 
		this.todo$.next(this.todos);
		this.rank$.next(this.rank);
		this.completedHide$.next(this.completedHide);
	}

	private persist(): void { 
		this.store.set(TODOS, this.todos);
	}

	public toggleRank(r: RankBy): void { 
		this.rank = r;
		this.rank$.next(r);
	}

	public getAll(): void { 
		this.todos = this.store.getList(TODOS);
		this.broadCast();
	}

	public getRaw(): Todo[] { 
		return this.todos;
	}

	public getByUUID(uuid: string): Todo | null { 
		return this.todos.filter((todo: Todo) => todo._id === uuid)[0] || null;
	}

	public setTodoToday(uuid: string): void { 
		const todo = this.getByUUID(uuid);
		if (todo && !todo.completedFlag) { 
			todo.planAt = floorToMinute(new Date()) + ONE_HOUR;
			this.update(todo);
		}
	}

	public update(todo: Todo): void {
		const index = this.todos.findIndex(t => t._id === todo._id);
		if (index !== -1) {
		  todo.completedAt = todo.completedFlag ? getCurrentTime() : undefined;
		  this.todos.splice(index, 1, todo);
		  this.persist();
		  this.broadCast();
		}
	}

	public toggleTodoComplete(uuid: string): void {
		const todo = this.getByUUID(uuid);
		console.log(todo)
		if (todo) {
		  todo.completedFlag = !todo.completedFlag;
		  todo.completedAt = todo.completedFlag ? getCurrentTime() : undefined;
			this.persist();
			this.completedHide$.next(this.completedHide);
		}
	  }
	
	  public moveToList(uuid: string, listUUID: string): void {
		const todo = this.getByUUID(uuid);
		if (todo) {
		  todo.listUUID = listUUID;
		  this.update(todo);
		}
	  }
	
	  public add(title: string): void {
		const listUUID = this.listService.getCurrentListUuid();
		const newTodo = new Todo(title, listUUID);
	
		if (listUUID === 'today') {
		  newTodo.planAt = floorToMinute(new Date()) + ONE_HOUR;
		  newTodo.listUUID = 'todo';
		}
	
		this.todos.push(newTodo);
		this.persist();
		this.broadCast();
	  }

	public delete(uuid: string): void {
		const index = this.todos.findIndex(t => t._id === uuid);
		if (index !== -1) {
		  this.todos.splice(index, 1);
		  this.persist()
		  this.broadCast();
		}
	  }
	
	public deleteInList(uuid: string): void {
		const toDelete = this.todos.filter(t => t.listUUID === uuid);
		toDelete.forEach(t => this.delete(t._id));
	}
	
	public toggleCompletedHide(hide: boolean): void {
		this.completedHide = hide;
		this.completedHide$.next(hide);
	  }
}
