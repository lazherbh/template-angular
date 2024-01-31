import { RankBy } from './../../../../../domain/entities';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ListService } from 'src/app/services/list/list.service';
import { TodoService } from 'src/app/services/todo/todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	private listTitle$: Subscription;
	public listTitle: string = "";
	public completedHide: boolean = false;
	private unsubscribe$ = new Subject<void>();
	constructor(
		private listService: ListService,
		private todoService: TodoService
	  ) { }

	ngOnInit(): void {
		this.listTitle$ = this.listService.current$
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(list => {
			this.listTitle = list ? list.title : "";
		});
		this.todoService.completedHide$
      		.pipe(takeUntil(this.unsubscribe$))
      		.subscribe(hide => this.completedHide = hide);
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
		
	}
	
	public switchRankType(str: RankBy): void { 
		this.todoService.toggleRank(str)
	}

	public toggleCompletedHide(): void { 
		this.todoService.toggleCompletedHide(!this.completedHide)
	}

}
