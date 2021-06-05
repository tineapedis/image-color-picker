import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedComponentModule } from '../modules/shared/shared-component.module';
import { AppComponent } from './app.component';
import { MaterialModule } from '../modules/material/material.module';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CommonService } from '../services/common.service';
import { ColorService } from '../services/color.service';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    SharedComponentModule,
  ],
  providers: [CommonService, ColorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
