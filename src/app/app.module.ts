import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { RiichiTableComponent } from './screens/table/component';
import { OutcomeSelectComponent } from './screens/outcome-select/component';
import { UserSelectComponent } from './screens/user-select/component';
import { UserItemComponent } from './screens/user-select/user-item/component';
import { YakuSelectComponent } from './screens/yaku-select/component';
import { YakuItemButtonComponent } from './screens/yaku-select/yaku-item-button/component';
import { NavBarComponent } from './screens/navbar/component';
import { YakumanPipe } from './helpers/yakuman.pipe';

@NgModule({
  declarations: [
    AppComponent,

    RiichiTableComponent,
    OutcomeSelectComponent,
    UserSelectComponent,
    UserItemComponent,
    YakuSelectComponent,
    YakuItemButtonComponent,
    NavBarComponent,

    YakumanPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
