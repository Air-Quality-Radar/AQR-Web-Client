import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { DataPoint } from '../data-point/data-point';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RadarAPIClient {
  private baseUrl = 'http://aqrradarapi.azurewebsites.net/air-quality/';
  private endpointUrl = this.baseUrl + '2017-03-01';

  constructor (private http: Http) {
    // todo: remove
    this.endpointUrl = 'assets/sample_data.json';
  }

  public getDataPoints(): Observable<DataPoint[]> {
    return this.http.get(this.endpointUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
