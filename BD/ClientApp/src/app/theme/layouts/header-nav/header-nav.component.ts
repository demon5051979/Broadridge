import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '../../../_services';
import { User } from 'src/app/_models/user';

declare let mLayout: any;
@Component({
  selector: "app-header-nav",
  templateUrl: "./header-nav.component.html",
  styleUrls: ['./header-nav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {

  userName: string;
  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.userName = `${this.currentUser.firstName ? this.currentUser.firstName : ''} ${this.currentUser.lastName ? this.currentUser.lastName : ''}`;
  }

  ngOnInit() { }

  ngAfterViewInit() {
    mLayout.initHeader();
  }
}
