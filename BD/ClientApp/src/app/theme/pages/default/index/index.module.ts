import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafeHtmlPipe } from '../../../../pipes/safe-html-pipe';
import { DisqusModule } from 'ngx-disqus';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { ExitGuard } from '../../../../_guards/exit.guard';
import { NumberOnlyDirective } from 'src/app/_directives/only-number.directive';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NoWhiteSpaceDirective } from 'src/app/_directives/no-white-space.directive';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    "path": "",
    "component": DefaultComponent,
    "children": [
      {
        "path": "",
        "component": IndexComponent,
      }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    AngularFileUploaderModule,
    RouterModule.forChild(routes),
    LayoutModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    NgbDatepickerModule,
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    IndexComponent,
    SafeHtmlPipe,
    NumberOnlyDirective,
    NoWhiteSpaceDirective
  ],
  providers: [    
    NumberOnlyDirective,
    NoWhiteSpaceDirective,
    DatePipe
  ]
})
export class IndexModule { }
