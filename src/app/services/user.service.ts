import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { User } from '../models/user';
import { UserUpdate } from '../models/userUpdate';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }


  getUser(userId:number): Observable<ListResponseModel<UserUpdate>> {
    let newPath = environment.apiUrl + 'users/getuserdetailbyId?userId='+userId;
    return this.httpClient.get<ListResponseModel<UserUpdate>>(newPath);
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
