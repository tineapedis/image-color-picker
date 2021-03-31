import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ImageColorPickerComponent } from './components/image-color-picker/image-color-picker.component';
import { ImageDisplayComponent } from './components/image-display/image-display.component';

const routes: Routes = [{ path: '', component: ImageColorPickerComponent }];

@NgModule({
  declarations: [ImageColorPickerComponent, ImageDisplayComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
  ],
})
export class ImageColorPickerModule {}
