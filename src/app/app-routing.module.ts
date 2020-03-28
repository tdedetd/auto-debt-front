import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckListComponent } from './screens/check-list/check-list.component';

const routes: Routes = [
  { path: 'check-list', component: CheckListComponent },
  { path: '', component: CheckListComponent },
  { path: '**', component: CheckListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
