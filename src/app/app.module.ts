import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { OverviewScreen } from './components/screen-overview';
import { OutcomeSelectScreen } from './components/screen-outcome-select';
import { PlayersSelectScreen } from './components/screen-players-select';
import { YakuSelectScreen } from './components/screen-yaku-select';

import { UserItemComponent } from './components/element-user-item';
import { YakuItemButtonComponent } from './components/element-yaku-item-button';
import { NavBarComponent } from './components/navbar';

import { YakumanPipe } from './helpers/yakuman.pipe';
import { FormatRoundPipe } from './helpers/formatRound.pipe';

@NgModule({
  declarations: [
    AppComponent,

    OverviewScreen,
    OutcomeSelectScreen,
    PlayersSelectScreen,
    UserItemComponent,
    YakuSelectScreen,
    YakuItemButtonComponent,
    NavBarComponent,

    YakumanPipe,
    FormatRoundPipe
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
