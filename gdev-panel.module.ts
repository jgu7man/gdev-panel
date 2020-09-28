import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GdevPanelRoutingModule } from './gdev-panel-routing.module';
import { PanelComponent } from './panel/panel.component';


@NgModule({
  declarations: [PanelComponent],
  imports: [
    CommonModule,
    GdevPanelRoutingModule
  ]
})
export class GdevPanelModule { }
