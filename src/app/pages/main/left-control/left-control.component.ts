import { ListComponent } from './list/list.component';
import { USERNAME } from './../../../services/local-stroage.namespace';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LocalStroageService} from "../../../services/local-stroage.service"
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-control',
  templateUrl: './left-control.component.html',
  styleUrls: ['./left-control.component.css']
})
export class LeftControlComponent implements OnInit {
	@Input() isCollapsed: boolean;
	@ViewChild(ListComponent) listComponent: ListComponent;
	public username: string
	constructor(
		private store: LocalStroageService,
		private router: Router
  ) { }

	public ngOnInit(): void {
	  this.username = this.store.get(USERNAME)
	}
	
	public openAddListModal(): void {
		this.listComponent.openAddListModal();
	}
	public goSetting() {
		this.router.navigateByUrl('/setting');
	  }
	
	public goSummary() {
		this.router.navigateByUrl('/summary');
	  }

}
