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

  getSpecificData(url: string, id) {
    const httpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('AuthorazationToken')
    });
    return this.http.get(url + `/${id}`, { headers: httpHeaders });
  }

  saveData(url: string, body) {
    const httpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('AuthorazationToken')
    });
    return this.http.post(url, body, {
      headers: httpHeaders
    });
  }

  logout(url: string, body) {
    const httpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('AuthorazationToken')
    });
    return this.http.post(url, body, {
      headers: httpHeaders
    });
  }

  deletePermmanently(url: string, id) {
    const httpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('AuthorazationToken')
    });

    return this.http.put(url + `${id}`, '', {
      headers: httpHeaders
    });
  }
}
