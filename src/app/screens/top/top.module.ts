import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TopComponent } from './components/top/top.component';
import { ColorToolsComponent } from './components/color-tools/color-tools.component';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [{ path: '', component: TopComponent }];

@NgModule({
  declarations: [TopComponent, ColorToolsComponent],
  imports: [RouterModule.forChild(routes), CommonModule, FlexLayoutModule],
})
export class TopModule {}
