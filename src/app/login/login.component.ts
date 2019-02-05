import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthenticationService } from '../shared/services';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    username: string;
    password: string;

    constructor(public router: Router, private authenticationService: AuthenticationService, private cookieService: CookieService) {
    }

    ngOnInit() {
    }

    onLoggedin() {
        this.authenticationService.authenticate(this.username, this.password).toPromise().then(response => {

            this.cookieService.set('hediapps', JSON.stringify(response), new Date(Date.now() + 1000 * 60 * 60));
            this.router.navigate(['/']);
        });

    }
}
