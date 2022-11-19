import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAppDummyItem } from '../interfaces/iAppDummyItem';


@Injectable({
  providedIn: 'root'
})
export class AppDummyService {

  constructor(private http : HttpClient) { }


  obtenerPermisosActivousuarios(user_id : string) : Observable<IAppDummyItem[]> {
    return this.http.post<IAppDummyItem[]>(url, {user_id : user_id});
  }

}

const url = "http://localhost:3000/api/v1/dummy";
