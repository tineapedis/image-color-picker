import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';

import { HueComponent } from './components/hue/hue.component';
import { SaturationComponent } from './components/saturation/saturation.component';

const routes: Routes = [
  { path: 'hue', component: HueComponent },
  { path: 'saturation', component: SaturationComponent },
];

@NgModule({
  declarations: [HueComponent, SaturationComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
  ],
})
export class ChartModule {}
