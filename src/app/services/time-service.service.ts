import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateInfo } from '../interfaces/dateInfo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeServiceService {

  constructor(private http: HttpClient) { }

  getTime(timeZone: string): Observable<DateInfo> {
    return this.http.get<DateInfo>(`https://timeapi.io/api/time/current/zone?timeZone=${timeZone}`);
  }
}
