import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';

import { HueComponent } from './components/hue/hue.component';

const routes: Routes = [{ path: 'hue', component: HueComponent }];

@NgModule({
  declarations: [HueComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
  ],
})
export class ChartModule {}
