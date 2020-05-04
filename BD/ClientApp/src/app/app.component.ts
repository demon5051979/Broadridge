import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
    selector: 'body',
    templateUrl: './app.component.html',
    //styleUrls: ['./app.component.css']
    encapsulation: ViewEncapsulation.None,
})

export class AppComponent implements OnInit {
    title = 'app';
    returnUrl: string;
    globalBodyClass = 'm-page--loading-non-block m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default';

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
}
