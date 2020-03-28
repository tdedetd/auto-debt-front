import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckboxComponent } from './controls/checkbox/checkbox.component';
import { StatusBarTopComponent } from './components/status-bar-top/status-bar-top.component';
import { StatusBarBottomComponent } from './components/status-bar-bottom/status-bar-bottom.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckboxComponent,
    StatusBarTopComponent,
    StatusBarBottomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
