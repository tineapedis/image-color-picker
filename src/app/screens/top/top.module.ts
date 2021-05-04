import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TopComponent } from './components/top/top.component';

const routes: Routes = [{ path: '', component: TopComponent }];

@NgModule({
  declarations: [TopComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class TopModule {}
