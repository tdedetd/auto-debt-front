import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckboxComponent } from './controls/checkbox/checkbox.component';
import { StatusBarTopComponent } from './components/status-bar-top/status-bar-top.component';
import { StatusBarBottomComponent } from './components/status-bar-bottom/status-bar-bottom.component';
import { CheckListComponent } from './screens/check-list/check-list.component';
import { CheckItemComponent } from './components/check-item/check-item.component';
import { environment } from 'src/environments/environment';
import { MockInterceptor } from './services/mock.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CheckboxComponent,
    StatusBarTopComponent,
    StatusBarBottomComponent,
    CheckListComponent,
    CheckItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [
    environment.mock ? MockInterceptor : [],
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
