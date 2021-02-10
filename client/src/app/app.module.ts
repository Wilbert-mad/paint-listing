import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageHomeComponent, PageAboutComponent } from './views';
import { NavBarComponent, FooterComponent, UiDarkmodeSwitchComponent } from './components';

@NgModule({
  declarations: [
    AppComponent,
    PageHomeComponent,
    PageAboutComponent,
    NavBarComponent,
    FooterComponent,
    UiDarkmodeSwitchComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
