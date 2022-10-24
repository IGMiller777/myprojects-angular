import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  fetchUsers(){
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  addUsers(userData: any){
    return this.http.post('https://jsonplaceholder.typicode.com/users',userData);
  }

  updateUser(payload: any,id:number){
    return this.http.put('https://jsonplaceholder.typicode.com/users/'+id, payload);
  }

  deleteUser(id:number){
    return this.http.delete('https://jsonplaceholder.typicode.com/users/'+id);
  }
}
