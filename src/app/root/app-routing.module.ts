import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../screens/image-color-picker/image-color-picker.module').then(
        (m) => m.ImageColorPickerModule
      ),
  },
  {
    path: 'top',
    loadChildren: () =>
      import('../screens/top/top.module').then((m) => m.TopModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
