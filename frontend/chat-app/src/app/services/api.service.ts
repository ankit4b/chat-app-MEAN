import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  uri:string = "http://localhost:5000/api";

  constructor(private http: HttpClient, private authService: AuthService) { }

  register(data: any): Observable<any>{
    return this.http.post(`${this.uri}/user`, data)
  }

  login(data: any): Observable<any>{
    return this.http.post(`${this.uri}/user/login`, data)
  }


  uploadImage(val: any): Observable<any>{
    return this.http.post("https://api.cloudinary.com/v1_1/dsqteibj6/image/upload", val)
  }

  chatAccess(user_id: any): Observable<any>{
    // Ensure authToken is set before making the request
    if (!this.authService.getAuthToken()) {
      throw new Error('Authentication token not set.');
    }

    // Add the Authorization header with the Bearer token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAuthToken()}`,
    });

    const requestBody = {
      "userId" : user_id
    }

    return this.http.post(`${this.uri}/chat`,requestBody, {headers} )
  }

  fetchChatList(): Observable<any>{
    // Ensure authToken is set before making the request
    if (!this.authService.getAuthToken()) {
      throw new Error('Authentication token not set.');
    }

    // Add the Authorization header with the Bearer token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAuthToken()}`,
    });

    return this.http.get(`${this.uri}/chat`, {headers})
  }

  searchByName(name: string): Observable<any> {
    // Add the Authorization header with the Bearer token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAuthToken()}`,
    });

    const params = { search: name };
    return this.http.get(`${this.uri}/user`, { headers, params });
  }

  fetchChatHistory(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAuthToken()}`,
    });

    return this.http.get(`${this.uri}/message/${id}`, {headers})
  }

  sendMessage(id: string, message: string){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAuthToken()}`,
    });

    const requestBody = {
      "content": message,
      "chatId": id
    }

    return this.http.post(`${this.uri}/message`,requestBody, {headers} )
  }
}
