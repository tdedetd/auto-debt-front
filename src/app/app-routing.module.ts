import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DebtSummaryComponent, CheckListComponent, EditCheckComponent, EditDebtComponent } from './screens';

const routes: Routes = [
  { path: '', component: DebtSummaryComponent },
  { path: 'check-list/credit', component: CheckListComponent, data: { debtType: 'credit' } },
  { path: 'check-list/debit', component: CheckListComponent, data: { debtType: 'debit' } },
  { path: 'check-list/credit/:userId', component: CheckListComponent, data: { debtType: 'credit' } },
  { path: 'check-list/debit/:userId', component: CheckListComponent, data: { debtType: 'debit' } },
  { path: 'edit-check', component: EditCheckComponent },
  { path: 'edit-debt/:checkId', component: EditDebtComponent },
  { path: '**', component: CheckListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
