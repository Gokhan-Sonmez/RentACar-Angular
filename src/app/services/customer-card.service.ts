import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerCard } from '../models/customerCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerCardService {

  constructor(private httpClient:HttpClient) { }

saveCard(customerCard:CustomerCard):Observable<ResponseModel> {
  const httpOptions ={
    headers:new HttpHeaders({
      'Content-Type':  'application/json',
    })
  }
  let newPath = environment.apiUrl+ "customercards/add"
  return this.httpClient.post<ResponseModel>(newPath,customerCard,httpOptions);
}
deleteCard(customerCard:CustomerCard):Observable<ResponseModel> {
  const httpOptions ={
    headers:new HttpHeaders({
      'Content-Type':  'application/json',
    })
  }
  let newPath = environment.apiUrl+ "customercards/delete"
  return this.httpClient.post<ResponseModel>(newPath,customerCard,httpOptions);
}

getByCardId(cardId:number): Observable<ListResponseModel<CustomerCard>> {
  let newPath = environment.apiUrl+ "customercards/getbycardid?cardid="+cardId
  return this.httpClient.get<ListResponseModel<CustomerCard>>(newPath);
}
getByCustomerId(customerId:number): Observable<ListResponseModel<CustomerCard>> {
  let newPath = environment.apiUrl+ "customercards/getbycustomerid?customerid="+customerId
  return this.httpClient.get<ListResponseModel<CustomerCard>>(newPath);
}


}
