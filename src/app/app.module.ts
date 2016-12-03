import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { OverviewScreen } from './components/screen-overview';
import { OutcomeSelectScreen } from './components/screen-outcome-select';
import { PlayersSelectScreen } from './components/screen-players-select';
import { YakuSelectScreen } from './components/screen-yaku-select';
import { ConfirmationScreen } from './components/screen-confirmation';

import { UserItemComponent } from './components/element-user-item';
import { YakuItemButtonComponent } from './components/element-yaku-item-button';
import { NavBarComponent } from './components/navbar';
import { ConfirmationSchemeComponent } from './components/element-confirmation-scheme';

import { YakumanPipe } from './helpers/yakuman.pipe';
import { FormatRoundPipe } from './helpers/formatRound.pipe';

import { RiichiApiService } from './services/riichiApi';

@NgModule({
  declarations: [
    AppComponent,

    OverviewScreen,
    OutcomeSelectScreen,
    PlayersSelectScreen,
    YakuSelectScreen,
    ConfirmationScreen,

    UserItemComponent,
    YakuItemButtonComponent,
    NavBarComponent,
    ConfirmationSchemeComponent,

    YakumanPipe,
    FormatRoundPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [RiichiApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }


// TODO; remove it
window.localStorage.setItem('userId', '9');
window.localStorage.setItem('eventId', '1');
