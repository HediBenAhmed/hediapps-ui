import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {User} from '../model/user';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticateService {

    constructor(private http: HttpClient) {
    }

    public login(userName: string, password: string): Observable<{ token: string, user: User }> {

        const loginUrl = `${environment.authApiRoot}/login`;
        const currentUserUrl = `${environment.authApiRoot}/current`;

        return this.http.post(loginUrl, {username: userName, password: password}, {observe: 'response'})
            .pipe(map(response => response.headers.get('Authorization')))
            .pipe(mergeMap(token =>
                this.http.get<User>(currentUserUrl, {headers: new HttpHeaders({'Authorization': token})})
                    .pipe(map(user => {
                        console.log(token);
                        return {token, user};
                    }))
            ));
    }
}
