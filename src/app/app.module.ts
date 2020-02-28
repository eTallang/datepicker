import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DatepickerModule } from './datepicker/datepicker.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
