import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AgGridModule.withComponents([])],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
