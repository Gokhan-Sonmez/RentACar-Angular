import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login';
import { RegisterModel } from '../models/register';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { UserUpdate } from '../models/userUpdate';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userName: string = "";
  userId: number;
  token:any;
  TOKEN_KEY="token"
  roles: string[] = [];
  jwtHelper:JwtHelperService = new JwtHelperService();
  constructor(private httpClient:HttpClient,
    private router:Router,
    private storeService:LocalStorageService,
   ) { }
  
  login(login:LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = environment.apiUrl+ "auth/login"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, login);
  }
  register(register:RegisterModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = environment.apiUrl+ "auth/register"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, register);
  }

  update(update:UserUpdate): Observable<SingleResponseModel<TokenModel>> {
    let newPath = environment.apiUrl+ "auth/update"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, update);
  }

  isAuthenticated(){
    if(this.storeService.getItem(this.TOKEN_KEY)){
      return true;
    }
    else{
      return false;
    }
  }

  logOut(){
  this.storeService.removeItem(this.TOKEN_KEY)
  setTimeout(function(){
    location.reload()
  },200)
  }

 
  getDecodedToken(){
    this.token = this.storeService.getItem(this.TOKEN_KEY);
    return  this.jwtHelper.decodeToken(this.token);
  }

  getCurrentUserId() {

    let decodedToken = this.getDecodedToken()
   
    return this.userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  }

  getCurrentUserName(){
    let decodedToken = this.getDecodedToken()
    let userName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    return this.userName = userName.split(' ')[0];
  }

  getCurrentUserRole(){
    let decodedToken = this.getDecodedToken()
   return this.roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    
  }


  
}