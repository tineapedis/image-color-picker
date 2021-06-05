import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorCodeListComponent } from './components/color-code-list/color-code-list.component';
import { MaterialModule } from '../../modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NotificationService } from '../../services/notification.service';

@NgModule({
  declarations: [ColorCodeListComponent],
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
  exports: [ColorCodeListComponent],
  providers: [NotificationService],
})
export class SharedComponentModule {}
