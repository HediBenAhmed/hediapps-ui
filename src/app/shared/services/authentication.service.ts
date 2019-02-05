import { User } from '../model/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthenticationService {

    constructor(private http: HttpClient) {
    }

    authenticate(username: string, password: string): Observable<{ token: string, user: User }> {
        const loginUrl = `${environment.authApiRoot}/login`;
        const currentUserUrl = `${environment.authApiRoot}/current`;

        return this.http.post(loginUrl, {username: username, password: password}, {observe: 'response'})
            .pipe(map(response => response.headers.get('Authorization')))
            .pipe(mergeMap(token =>
                this.http.get<User>(currentUserUrl,
                    {headers: new HttpHeaders({'Authorization': token})})
                    .pipe(map(user => {
                        return {token, user};
                    }))
            ));
    }

    signUp(user: User): Observable<void> {
        const signUpUrl = `${environment.authApiRoot}/sign-up`;
        return this.http.post<void>(signUpUrl, user);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
