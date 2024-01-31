import { TodoService } from './../../../../services/todo/todo.service';
import { ListService } from './../../../../services/list/list.service';
import { Component, ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzDropdownContextComponent, NzDropdownService, NzModalService } from 'ng-zorro-antd';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { List } from 'src/domain/entities';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
	@Input()
	isCollapsed: boolean = false;
	public listRenameInput: string = "";
	public listInput: string = "";

	public lists: List[] = [];
	public currentListUuid: string;
	public contextListUuid: string;
	public addListModalVisible: boolean = false;
	public renameListModalVisible: boolean = false;
	private dropdown: NzDropdownContextComponent;
	private destroy$: Subject<void> = new Subject();

	constructor(
		private dropdownService: NzDropdownService,
		private listService: ListService,
		private todoService: TodoService,
		private modal: NzModalService,
	  ) { }

	ngOnInit(): void {
		this.listService.lists$
			.pipe(takeUntil(this.destroy$))
			.subscribe(lists => { 
				this.lists = lists;
			})
		this.listService.currentUuid$
			.pipe(takeUntil(this.destroy$))
			.subscribe(uuid => { 
				this.currentListUuid = uuid;
			})
		this.listService.getAll()
	}
	
	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public closeAddListModal(): void { 
		this.addListModalVisible = false;
	}

	public closeRenameListModal(): void { 
		this.renameListModalVisible = false;
	}

	public openAddListModal(): void {
		this.addListModalVisible = true;
	}
	
	public openRenameListModal(): void { 
		this.renameListModalVisible = true;
		setTimeout(() => { 
			const title = this.lists.find(l => l._id === this.contextListUuid)?.title;
			this.listRenameInput = title;
		})
	}

	public contextMenu($event: MouseEvent,template: TemplateRef<void>, uuid: string): void { 
		this.dropdown = this.dropdownService.create($event, template);
		this.contextListUuid = uuid;
	}

	public click(uuid: string): void { 
		this.listService.setCurrentUuid(uuid)
	}

	public handleRename():void { 
		this.listService.rename(this.contextListUuid, this.listRenameInput);
		this.closeRenameListModal();
		this.listRenameInput = '';
	}
	

	public handleAddList(): void { 
		this.listService.add(this.listInput);
		this.closeAddListModal();
		this.listInput = '';
	}
	
	public delete(): void { 
		const uuid = this.contextListUuid;
		this.modal.confirm({
		nzTitle: 'Confirm deletion list',
		nzContent: 'This operation will cause all to-do items under the list to be deleted',
		nzOnOk: () =>
			new Promise<void>((res, rej) => {
			this.listService.delete(uuid);
			this.todoService.deleteInList(uuid);
			res();
			}).catch(() => console.error('Delete list failed'))
		});
	}

	public close(): void { 
		this.dropdown.close();
	}

}
