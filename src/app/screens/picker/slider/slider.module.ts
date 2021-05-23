import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SliderComponent } from './components/slider/slider.component';
import { SliderSelectComponent } from './components/slider-select/slider-select.component';

const routes: Routes = [{ path: '', component: SliderComponent }];

@NgModule({
  declarations: [SliderComponent, SliderSelectComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
  ],
})
export class SliderModule {}
