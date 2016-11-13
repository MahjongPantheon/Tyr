import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './component';
import { RiichiTableComponent } from './screens/table/component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    RiichiTableComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }

