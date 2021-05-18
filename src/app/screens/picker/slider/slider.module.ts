import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SliderComponent } from './components/slider/slider.component';

const routes: Routes = [{ path: '', component: SliderComponent }];

@NgModule({
  declarations: [SliderComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class SliderModule {}
