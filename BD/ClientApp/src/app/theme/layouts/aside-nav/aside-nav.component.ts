import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { AuthenticationService } from '../../../_services';

declare let mLayout: any;
@Component({
    selector: "app-aside-nav",
    templateUrl: "./aside-nav.component.html",
    styleUrls: ['./aside-nav.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent implements OnInit, AfterViewInit {
    constructor(
        private adalSvc: MsAdalAngular6Service,
        private authenticationService: AuthenticationService) {
    }
    ngOnInit() {

    }
    ngAfterViewInit() {
        mLayout.initAside();
    }

    logOut() {
        this.adalSvc.logout();
        this.authenticationService.logout();
    }
}
