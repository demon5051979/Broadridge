import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AccessDeniedComponent } from './access-denied';
import { LoadingComponent } from './loading/loading.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'denied', component: AccessDeniedComponent },
  { path: 'loading', component: LoadingComponent },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
