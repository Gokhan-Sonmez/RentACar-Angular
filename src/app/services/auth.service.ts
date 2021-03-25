import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login';
import { RegisterModel } from '../models/register';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  TOKEN_KEY="token"
  constructor(private httpClient:HttpClient) { }

  login(login:LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = environment.apiUrl+ "auth/login"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, login);
  }
  register(register:RegisterModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = environment.apiUrl+ "auth/register"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, register);
  }

  isAuthenticated(){
    if(localStorage.getItem(this.TOKEN_KEY)){
      return true;
    }
    else{
      return false;
    }
  }

  logOut(){
    localStorage.removeItem(this.TOKEN_KEY)
  }
}