import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SettingComponent } from './setting.component';
import { SettingRoutingModule } from './setting-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SettingRoutingModule,
	NgZorroAntdModule,
	FormsModule
  ],
  declarations: [ SettingComponent ]
})
export class SettingModule { }
