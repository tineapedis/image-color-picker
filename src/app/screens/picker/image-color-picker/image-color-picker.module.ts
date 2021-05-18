import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { ImageColorPickerComponent } from './components/image-color-picker/image-color-picker.component';
import { ImageDisplayComponent } from './components/image-display/image-display.component';
import { PickedColorComponent } from './components/picked-color/picked-color.component';
import { ImageSelectComponent } from './components/image-select/image-select.component';

import { ImageColorPickerService } from '../../../services/image-color-picker.service';

const routes: Routes = [{ path: '', component: ImageColorPickerComponent }];

@NgModule({
  declarations: [
    ImageColorPickerComponent,
    ImageDisplayComponent,
    PickedColorComponent,
    ImageSelectComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
  ],
  providers: [ImageColorPickerService],
})
export class ImageColorPickerModule {}
