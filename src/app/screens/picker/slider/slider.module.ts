import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SliderComponent } from './components/slider/slider.component';
import { SliderSelectComponent } from './components/slider-select/slider-select.component';
import { SharedComponentModule } from '../../../modules/shared/shared-component.module';
import { NotificationService } from '../../../services/notification.service';

const routes: Routes = [{ path: '', component: SliderComponent }];

@NgModule({
  declarations: [SliderComponent, SliderSelectComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    SharedComponentModule,
  ],
})
export class SliderModule {}
