import { generateUUID } from "src/utils/uuid";

export class Todo {
	public _id: string;
	public title?: string;
	public createdAt?: number;
	public listUUID: string;
	public desc?: string;
	public completedFlag: boolean;
	public completedAt?: number;
	public dueAt?: number;
	public planAt?: number;
	public notifyMe = false;
  
	constructor(title: string, listUUID: string) {
	  this._id = generateUUID();
	  this.title = title;
	  this.listUUID = listUUID;
	  this.completedFlag = false;
	}
  }
  
  export class List {
	public _id: string;
	public title: string;
	public createdAt?: number;
  
	constructor(title: string) {
	  this._id = generateUUID();
	  this.title = title;
	}
}

export type RankBy = 'title' | 'dueAt' | 'planAt' | 'completeFlag';

export class Summary {
	_id: string;
	date: number;
	completedTodos: string[];
	cCount = 0;
	uncompletedTodos: string[];
	uCount = 0;
  
	constructor(date: number, cItems: string[], uItems: string[]) {
	  this.date = date;
	  this.completedTodos = cItems;
	  this.uncompletedTodos = uItems;
	  this.cCount = this.completedTodos.length;
	  this.uCount = this.uncompletedTodos.length;
	}
  }
