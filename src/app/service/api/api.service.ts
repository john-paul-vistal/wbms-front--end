import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getData(url: string) {
    const httpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('AuthorazationToken')
    });
    return this.http.get(url, { headers: httpHeaders });
  }
}
