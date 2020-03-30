import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckListComponent } from './screens/check-list/check-list.component';
import { DebtSummaryComponent } from './screens/debt-summary/debt-summary.component';

const routes: Routes = [
  { path: '', component: DebtSummaryComponent },
  { path: 'check-list', component: CheckListComponent },
  { path: '**', component: CheckListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
