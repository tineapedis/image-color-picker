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
      import('../screens/image-color-picker/image-color-picker.module').then(
        (m) => m.ImageColorPickerModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
