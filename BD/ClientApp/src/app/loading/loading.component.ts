import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
    constructor(
        private authenticationService: AuthenticationService,
        private adalSvc: MsAdalAngular6Service,
        private router: Router, ) {
        this.login(this.adalSvc.LoggedInUserEmail);
    }

    ngOnInit() { }

    login(email: string) {
        this.authenticationService.loginByEmail(email)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/index']);
                },
                error => {
                    this.router.navigate(['/denied']);
                    console.info(error)
                });
    }
}
