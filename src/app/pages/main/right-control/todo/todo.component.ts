import { DetailComponent } from './../../detail/detail.component';
import { map, takeUntil } from 'rxjs/operators';
import { TodoService } from './../../../../services/todo/todo.service';
import { ListService } from './../../../../services/list/list.service';
import { List, RankBy, Todo } from 'src/domain/entities';
import { combineLatest, forkJoin, Subject, zip } from 'rxjs';
import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { floorToDate, getTodayTime } from 'src/utils/time';
import { NzDrawerService, NzDropdownContextComponent, NzDropdownService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
const rankerGenerator = (type: RankBy = 'title'): any => {
  if (type === 'completeFlag') {
    return (t1: Todo, t2: Todo) => t1.completedFlag && !t2.completedFlag;
  }
  return (t1: Todo, t2: Todo) => t1[type] > t2[type];
};

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit, OnDestroy {
  public todos: Todo[] = [];
  public lists: List[] = [];
  public currentContextTodo: Todo;
  private destroy$: Subject<void> = new Subject();
  private dropdown: NzDropdownContextComponent;

  constructor(
    private listService: ListService,
    private todoService: TodoService,
    private dropdownService: NzDropdownService,
	private router: Router,
	private drawer: NzDrawerService,
  ) {}

  ngOnInit(): void {
    this.listService.lists$
      .pipe(takeUntil(this.destroy$))
      .subscribe((lists) => {
        this.lists = lists;
      });
	  combineLatest([
		  this.listService.currentUuid$,
		  this.todoService.todo$,
		  this.todoService.rank$,
		  this.todoService.completedHide$])
		  .subscribe(res => {
			this.processTodos(res[0], res[1], res[2], res[3])
		})
    this.todoService.getAll();
	this.listService.getAll();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

	private processTodos(listUUID: string, todos: Todo[], rank: RankBy, completedHide: boolean): void {
    const filterTodos = todos
      .filter((todo) => {
        return (
          (listUUID === 'today' &&
            todo.planAt &&
            floorToDate(todo.planAt) <= getTodayTime()) ||
          (listUUID === 'todo' &&
            (!todo.listUUID || todo.listUUID === 'todo')) ||
          listUUID === todo.listUUID
        );
      })
      .map((item) => Object.assign({}, item))
		.sort(rankerGenerator(rank))
		.filter(todo => completedHide ? !todo.completedFlag : todo)
    this.todos = [].concat(filterTodos);
  }

  public add(title: string): void {
    this.todoService.add(title);
  }

  public contextMenu(
    $event: MouseEvent,
    template: TemplateRef<void>,
    uuid: string
  ): void {
    this.dropdown = this.dropdownService.create($event, template);
    this.currentContextTodo = this.todos.find((t) => t._id === uuid);
  }

  public listsExcept(listUUID: string): List[] {
    return this.lists.filter((l) => l._id !== listUUID);
  }

	public handleToggle(uuid: string): void {
    this.todoService.toggleTodoComplete(uuid);
  }

  public delete(): void {
    this.todoService.setTodoToday(this.currentContextTodo._id);
  }

  public setToday(): void {
    this.todoService.setTodoToday(this.currentContextTodo._id);
  }

  public moveToList(listUuid: string): void {
    this.todoService.moveToList(this.currentContextTodo._id, listUuid);
  }

  public close(): void {
    this.dropdown.close();
  }

	public clickItem(uuid: string): void {
		this.router.navigateByUrl(`/main/${uuid}`);
		this.drawer.create({
			nzTitle: "Detailed information",
			nzContent: DetailComponent,
			nzWidth: 400,
			nzClosable: false,
		})
  }
}
