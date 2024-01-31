import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LeftControlComponent } from './left-control/left-control.component';
import { ListComponent } from './left-control/list/list.component';
import { FormsModule } from '@angular/forms';
import { MainRoutingModule } from './main-routing.module';
import { RightControlComponent } from './right-control/right-control.component';
import { HeaderComponent } from './right-control/header/header.component';
import { QuickAddComponent } from './right-control/quick-add/quick-add.component';
import { TodoComponent } from './right-control/todo/todo.component';
import { DetailComponent } from './detail/detail.component';
import { SuggestComponent } from './right-control/header/suggest/suggest.component';

@NgModule({
  declarations: [
    MainComponent,
    LeftControlComponent,
    ListComponent,
    RightControlComponent,
    HeaderComponent,
    QuickAddComponent,
    TodoComponent,
    DetailComponent,
    SuggestComponent
  ],
  imports: [
	  CommonModule,
	  NgZorroAntdModule,
	  FormsModule,
	  MainRoutingModule,
  ]
})
export class MainModule { }
