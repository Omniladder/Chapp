import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// This is legit just a wrapper around the HttpClient I dont know why this has to exist :p

@Injectable({
  providedIn: 'root'
})
export class Data {
  constructor(private http: HttpClient) {}


  getRequest<T>(url: string, payload?: any)  {
    return this.http.get<T>(url, payload);
  }

  postRequest<T>(url: string, payload?: any)  {
    return this.http.post<T>(url, payload);
  }

  putRequest<T>(url: string, payload?: any) {
    return this.http.put<T>(url, payload);
  }

  deleteRequest<T>(url: string, payload?: any) {
    return this.http.delete<T>(url);
  }

}
