import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../modules/material/material.module';

import { SimpleComponent } from './simple/simple.component';

const routes: Routes = [{ path: 'simple', component: SimpleComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
  ],
})
export class InformationModule {}
