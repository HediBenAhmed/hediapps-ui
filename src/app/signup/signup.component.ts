import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { AuthenticationService } from '../shared/services';
import { Router } from '@angular/router';
import { User } from '../shared/model/user';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

    username: string;
    password: string;
    email: string;

    constructor(public router: Router, private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
    }

    onSignUp() {
        const user = {
            username: this.username,
            password: this.password,
            email: this.email
        } as User;

        this.authenticationService.signUp(user).toPromise().then(response => {
                this.router.navigate(['/login']);
            }
        );
    }
}
