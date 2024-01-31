import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SetupComponent } from "./pages/setup/setup.component";
import { MainComponent } from "./pages/main/main.component";
import { InitGuardService } from "./services/init-guard/init-guard.service";
const routes: Routes = [
	{ path: "setup", component: SetupComponent,canActivate: [ InitGuardService ] },
	{ path: 'main', redirectTo: '/main', pathMatch: 'full' },
	{ path: '', redirectTo: '/setup', pathMatch: 'full' },
	{ path: 'summary', redirectTo: '/summary', pathMatch: 'full' },
	{ path: 'setting', redirectTo: '/setting', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }