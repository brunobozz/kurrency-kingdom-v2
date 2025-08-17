import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiKingdomService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  public getData(endpoint: string, skipSpinner?: boolean): Observable<any> {
    const headers = skipSpinner ? new HttpHeaders({ skipSpinner: 'true' }) : undefined;
    return this.http.get(this.API_URL + endpoint, { headers });
  }

  public postData(endpoint: string, body: any, skipSpinner?: boolean): Observable<any> {
    const headers = skipSpinner ? new HttpHeaders({ skipSpinner: 'true' }) : undefined;
    return this.http.post(this.API_URL + endpoint, body, { headers });
  }

  public deleteData(endpoint: string, skipSpinner?: boolean): Observable<any> {
    const headers = skipSpinner ? new HttpHeaders({ skipSpinner: 'true' }) : undefined;
    return this.http.delete(this.API_URL + endpoint, { headers });
  }

  public updateData(endpoint: string, data: any, skipSpinner?: boolean): Observable<any> {
    const headers = skipSpinner ? new HttpHeaders({ skipSpinner: 'true' }) : undefined;
    return this.http.put(this.API_URL + endpoint, data, { headers });
  }

}
