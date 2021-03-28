import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../modules/material/material.module';
import { ImageColorPickerComponent } from './components/image-color-picker/image-color-picker.component';

const routes: Routes = [{ path: '', component: ImageColorPickerComponent }];

@NgModule({
  declarations: [ImageColorPickerComponent],
  imports: [RouterModule.forChild(routes), CommonModule, MaterialModule],
})
export class ImageColorPickerModule {}
