import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { CheckboxComponent, BadgeComponent, ButtonComponent, TextboxComponent, FindTextboxComponent, DropdownComponent } from './controls';
import { CheckListComponent, DebtSummaryComponent, EditCheckComponent, EditDebtComponent } from './screens';
import { ApiService, UserService, AppStateService } from './services';
import { MockInterceptor, AuthInterceptor } from './interceptors';
import { StatusBarTopComponent, StatusBarBottomComponent, CheckItemComponent, SummaryTotalCardComponent, SummaryCardComponent, EditCheckItemCardComponent, ModalComponent, EditDebtItemCardComponent } from './components';

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
    EditDebtComponent,
    EditDebtItemCardComponent,
    FindTextboxComponent,
    DropdownComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [
    ApiService,
    UserService,
    AppStateService,
    environment.mock ? { provide: HTTP_INTERCEPTORS, useClass: MockInterceptor, multi: true } : [],
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
