import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './component';
import { RiichiTableComponent } from './screens/table/component';
import { OutcomeSelectComponent } from './screens/outcome-select/component';
import { UserSelectComponent } from './screens/user-select/component';
import { UserItemComponent } from './screens/user-select/user-item/component';
import { YakuSelectComponent } from './screens/yaku-select/component';
import { YakuItemButtonComponent } from './screens/yaku-select/yaku-item-button/component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    RiichiTableComponent,
    OutcomeSelectComponent,
    UserSelectComponent,
    UserItemComponent,
    YakuSelectComponent,
    YakuItemButtonComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }

