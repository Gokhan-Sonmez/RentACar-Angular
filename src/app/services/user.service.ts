import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }


  getUser(userId:number): Observable<ListResponseModel<User>> {
    let newPath = environment.apiUrl + 'users/get?userId='+userId;
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

  
  updateUser(user: User): Observable<ResponseModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    let newPath = environment.apiUrl + 'users/update';
    return this.httpClient.post<ResponseModel>(newPath, user, httpOptions);
  }
}
