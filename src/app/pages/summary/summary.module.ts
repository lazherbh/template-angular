import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './summary.component';
import { SummaryRoutingModule } from './summary-routing.module';
import { SummaryService } from './summary.service';

@NgModule({
  declarations: [
    SummaryComponent
  ],
  imports: [
	  CommonModule,
	  NgZorroAntdModule,
	  SummaryRoutingModule,
	],
	providers: [ SummaryService ]
})
export class SummaryModule { }
