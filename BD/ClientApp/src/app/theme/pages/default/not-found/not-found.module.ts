import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { NotFoundComponent } from './not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {
        'path': '',
        'component': DefaultComponent,
        'children': [
            {
                'path': '',
                'component': NotFoundComponent,
            },
        ],
    },
];

@NgModule({
    imports: [
        NgbModule,
        CommonModule, 
        LayoutModule,
        FormsModule
    ], exports: [
        RouterModule,
    ], declarations: [
        NotFoundComponent,
    ],
})
export class NotFoundModule {
}