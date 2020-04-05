import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckListComponent } from './screens/check-list/check-list.component';
import { DebtSummaryComponent } from './screens/debt-summary/debt-summary.component';
import { EditCheckComponent } from './screens/edit-check/edit-check.component';

const routes: Routes = [
  { path: '', component: DebtSummaryComponent },
  { path: 'check-list/credit', component: CheckListComponent, data: { debtType: 'credit' } },
  { path: 'check-list/debit', component: CheckListComponent, data: { debtType: 'debit' } },
  { path: 'check-list/credit/:userId', component: CheckListComponent, data: { debtType: 'credit' } },
  { path: 'check-list/debit/:userId', component: CheckListComponent, data: { debtType: 'debit' } },
  { path: 'edit-check', component: EditCheckComponent },
  { path: '**', component: CheckListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
