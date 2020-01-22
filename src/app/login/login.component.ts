import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {routerTransition} from '../router.animations';
import {AuthenticateService} from '../shared/service/authenticate.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    username: string;
    password: string;

    constructor(
        public router: Router,
        public authenticateService: AuthenticateService
    ) {
    }

    ngOnInit() {
    }

    onLoggedin() {
        this.authenticateService.login(this.username, this.password)
            .subscribe(({token, user}) => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('token', token);
                this.router.navigate(['/dashboard']);
            });
    }
}
