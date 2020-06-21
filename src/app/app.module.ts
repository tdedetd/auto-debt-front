import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckboxComponent } from './controls/checkbox/checkbox.component';
import { StatusBarTopComponent } from './components/status-bar-top/status-bar-top.component';
import { StatusBarBottomComponent } from './components/status-bar-bottom/status-bar-bottom.component';
import { CheckListComponent } from './screens/check-list/check-list.component';
import { CheckItemComponent } from './components/check-item/check-item.component';
import { environment } from 'src/environments/environment';
import { MockInterceptor } from './interceptors/mock.interceptor';
import { ApiService } from './services/api.service';
import { BadgeComponent } from './controls/badge/badge.component';
import { DebtSummaryComponent } from './screens/debt-summary/debt-summary.component';
import { SummaryTotalCardComponent } from './components/summary-total-card/summary-total-card.component';
import { SummaryCardComponent } from './components/summary-card/summary-card.component';
import { ButtonComponent } from './controls/button/button.component';
import { UserService } from './services/user.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { EditCheckComponent } from './screens/edit-check/edit-check.component';
import { TextboxComponent } from './controls/textbox/textbox.component';
import { EditCheckItemCardComponent } from './components/edit-check-item-card/edit-check-item-card.component';
import { ModalComponent } from './components/modal/modal.component';
import { EditDebtComponent } from './screens/edit-debt/edit-debt.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckboxComponent,
    StatusBarTopComponent,
    StatusBarBottomComponent,
    CheckListComponent,
    CheckItemComponent,
    BadgeComponent,
    DebtSummaryComponent,
    SummaryTotalCardComponent,
    SummaryCardComponent,
    ButtonComponent,
    EditCheckComponent,
    TextboxComponent,
    EditCheckItemCardComponent,
    ModalComponent,
    EditDebtComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [
    ApiService,
    UserService,
    environment.mock ? { provide: HTTP_INTERCEPTORS, useClass: MockInterceptor, multi: true } : [],
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
