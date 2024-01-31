import { List } from './../../../domain/entities';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStroageService } from '../local-stroage.service';
import { LISTS } from '../local-stroage.namespace';

type SpecialListUUID = "today" | "todo"
@Injectable({
  providedIn: 'root'
})
export class ListService {
	private lists: List[] = [];
	private current: List;
	public currentUuid: SpecialListUUID | string = "today";
	public currentUuid$ = new Subject<string>();
	public current$ = new Subject<List>();
	public lists$ = new Subject<List[]>();

	constructor(private store: LocalStroageService) { }

	private broadCast(): void { 
		this.lists$.next(this.lists);
		this.current$.next(this.current);
		this.currentUuid$.next(this.currentUuid);
	}

	private persist(): void { 
		this.store.set(LISTS, this.lists);
	}

	private getByUuid(uuid: string): any { 
		return this.lists.find(item => item._id === uuid)
	}

	private update(list: List): void { 
		const index = this.lists.findIndex(item => item._id === list._id);
		if (index === -1) { 
			this.lists.splice(index, 1, list);
			this.persist();
			this.broadCast();
		}
	}

	public getCurrentListUuid(): SpecialListUUID | string { 
		return this.currentUuid;
	}

	public getAll(): void { 
		this.lists = this.store.getList(LISTS);
		this.broadCast()
	}

	public setCurrentUuid(uuid: string): void { 
		this.currentUuid = uuid;
		this.current = this.lists.find(item => item._id === uuid);
		this.broadCast()
	}

	public add(title: string): void { 
		const newList = new List(title);
		this.lists.push(newList);
		this.currentUuid = newList._id;
		this.current = newList;
		this.broadCast();
		this.persist();
	}

	public rename(listUuid: string, title: string): void { 
		const list = this.getByUuid(listUuid);
		if (list) { 
			list.title = title;
			this.update(list)
		}
	}

	public delete(uuid: string): void { 
		const i = this.lists.findIndex(i => i._id === uuid);
		if (i !== -1) { 
			this.lists.splice(i, 1);
			this.currentUuid = this.lists.length
				? this.lists[this.lists.length - 1]._id
				: this.currentUuid === "today" ? "today" : "todo";
			this.broadCast();
			this.persist();
		}
	}
}
