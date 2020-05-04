import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollEventModule } from 'ngx-scroll-event';

const routes: Routes = [
  {
    "path": "",
    "component": DefaultComponent,
    "children": [
      {
        "path": "",
        "component": DashboardComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  exports: [
    RouterModule
  ],
  imports: [
    NgbModule,
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    ScrollEventModule,
    FormsModule
  ],
  providers: [DatePipe]
})
export class DashboardModule { }
