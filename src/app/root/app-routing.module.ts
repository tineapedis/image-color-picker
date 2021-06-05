import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../screens/top/top.module').then((m) => m.TopModule),
  },
  {
    path: 'image-color-picker',
    loadChildren: () =>
      import(
        '../screens/picker/image-color-picker/image-color-picker.module'
      ).then((m) => m.ImageColorPickerModule),
  },
  {
    path: 'slider',
    loadChildren: () =>
      import('../screens/picker/slider/slider.module').then(
        (m) => m.SliderModule
      ),
  },
  {
    path: 'information',
    loadChildren: () =>
      import('../screens/information/information.module').then(
        (m) => m.InformationModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
