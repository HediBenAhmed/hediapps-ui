import { User } from '../model/user';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpClientUtils {

    constructor(private http: HttpClient, private cookieService: CookieService) {
    }

    private createAuthorizationHeader(): HttpHeaders {
        if (this.cookieService.check('hediapps')) {
            const cookie: { token: string, user: User } = JSON.parse(this.cookieService.get('hediapps'));
            return new HttpHeaders({'Authorization': cookie.token});
        } else {
            return null;
        }
    }

    public get<U>(url: string, params: HttpParams): Observable<U> {
        const auth: HttpHeaders = this.createAuthorizationHeader();
        return this.http.get<U>(url, {headers: auth, params: params});
    }

    public post<U>(url, data): Observable<U> {
        const auth: HttpHeaders = this.createAuthorizationHeader();
        return this.http.post<U>(url, data, {
            headers: auth
        });
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
