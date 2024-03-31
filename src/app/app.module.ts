import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './views/app/app.component';
import { SortByPositionPipe } from './pipes/sort-by-position.pipe';
import { PlayerCardComponent } from './views/cards/player-card/player-card.component';
import { FindPlayerPipe } from './pipes/find-player.pipe';
import { FieldComponent } from './views/field/field.component';
import { CardsComponent } from './views/cards/cards.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppBarComponent } from './views/app/app-bar/app-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    AppBarComponent,
    SortByPositionPipe,
    PlayerCardComponent,
    FindPlayerPipe,
    FieldComponent,
    CardsComponent,
  ],
  imports: [BrowserModule, MatButtonModule, MatExpansionModule, MatIconModule],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
