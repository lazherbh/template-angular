import { INIT_FLAG } from './../local-stroage.namespace';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStroageService } from '../local-stroage.service';

@Injectable({
  providedIn: 'root'
})
export class InitGuardService implements CanActivate {

  constructor(
	private store: LocalStroageService,
    private router: Router,
  ) { }
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const init = !!this.store.get(INIT_FLAG);
		if (state.url.includes("setup") && init) { 
			this.router.navigateByUrl("/main");
			return false;
		}
		if (!state.url.includes("setup") && !init) { 
			this.router.navigateByUrl("/setup");
			return false;
		}
		return true;
	}
}
