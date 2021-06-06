import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../modules/material/material.module';
import { SharedComponentModule } from '../../modules/shared/shared-component.module';

import { SimpleComponent } from './simple/simple.component';

import { ColorNameService } from '../../services/network/color-name.service';

const routes: Routes = [{ path: 'simple', component: SimpleComponent }];

@NgModule({
  declarations: [SimpleComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    SharedComponentModule,
  ],
  providers: [ColorNameService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InformationModule {}
