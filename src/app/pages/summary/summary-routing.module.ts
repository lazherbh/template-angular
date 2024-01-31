import { RouterModule } from '@angular/router';
import { InitGuardService } from './../../services/init-guard/init-guard.service';
import { Routes } from '@angular/router';
import { SummaryComponent } from './summary.component';
import { NgModule } from '@angular/core';
const routes: Routes = [
	{
		path: "summary",
		component: SummaryComponent,
		canActivate:[ InitGuardService ]
	}
]
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SummaryRoutingModule { }