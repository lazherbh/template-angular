import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgZorroAntdModule } from "ng-zorro-antd"

// modules
import { AppRoutingModule } from './app-routing.module';
import { SetupModule } from './pages/setup/setup.module';
import { MainModule } from './pages/main/main.module';

//services
import { ListService } from './services/list/list.service';
import { TodoService } from './services/todo/todo.service';
import { LocalStroageService } from './services/local-stroage.service';
import { InitGuardService } from './services/init-guard/init-guard.service';
import { SummaryModule } from './pages/summary/summary.module';
import { SettingModule } from './pages/setting/setting.module';

registerLocaleData(zh);

@NgModule({
  declarations: [
	AppComponent,
 ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule,
    SetupModule,
    MainModule,
    SummaryModule,
    SettingModule,
  ],
	providers: [
		{ provide: NZ_I18N, useValue: zh_CN },
		LocalStroageService,
		ListService,
		TodoService,
		InitGuardService
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
