import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [{ path: 'contact', component: ContactComponent }];

@NgModule({
  declarations: [ContactComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class FooterModule {}
