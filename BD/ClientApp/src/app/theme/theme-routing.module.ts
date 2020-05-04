import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_guards';
import { AuthenticationGuard } from 'microsoft-adal-angular6';

const routes: Routes = [
  {
    path: "",
    component: ThemeComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: "index",
        loadChildren: () => import('./pages/default/index/index.module').then(m => m.IndexModule),
        canActivate: [AuthenticationGuard, AuthGuard]
      },   
      {
        path: "dashboard",
        loadChildren: () => import('./pages/default/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthenticationGuard, AuthGuard]        
      },
      {
        path: "edit/:id",
        loadChildren: () => import('./pages/default/index/index.module').then(m => m.IndexModule),
        canActivate: [AuthenticationGuard, AuthGuard]
      },     
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "**",
    redirectTo: "404",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule { }
