import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  public url='https://webknight.co.in/data_fetch_api.php'

  constructor(private _http:HttpClient) { }





  users(payload?:any){
    return this._http.post(`https://webknight.co.in/data_fetch_api.php`,payload)
  }
}
