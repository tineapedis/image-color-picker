import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [{ path: 'contact', component: ContactComponent }];

@NgModule({
  declarations: [ContactComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
})
export class FooterModule {}
