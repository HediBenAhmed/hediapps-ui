import { Injectable } from '@angular/core';
import { HttpClientUtils } from './httpClientUtils.service';
import { Observable } from 'rxjs';
import { DatasetSearchResult } from '../model/datasetSearchResult';
import { environment } from '../../../environments/environment';
import { DatasetResponse } from '../model/datasetResponse';
import { Share } from '../model/share';
import { HttpParams } from '@angular/common/http';
import { Page } from '../model/page';

@Injectable()
export class TradingService {

    constructor(private http: HttpClientUtils) {
    }

    search(query: string): Observable<DatasetSearchResult> {
        const searchUrl = `${environment.tradingApiRoot}/search`;
        return this.http.get<DatasetSearchResult>(searchUrl, new HttpParams().set('query', query));
    }

    getTimeSeries(databaseCode: string, datasetCode: string, limit: string): Observable<DatasetResponse> {
        const url = `${environment.tradingApiRoot}/time-series`;
        return this.http.get<DatasetResponse>(url, new HttpParams()
            .set('databaseCode', databaseCode)
            .set('datasetCode', datasetCode)
            .set('limit', limit));
    }

    getShares(page: number, size: number): Observable<Page<Share>> {
        const url = `${environment.tradingApiRoot}/shares`;
        return this.http.get<Page<Share>>(url, new HttpParams()
            .set('page', page + '')
            .set('size', size + ''));
    }
}
