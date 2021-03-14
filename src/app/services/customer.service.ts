import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl= 'https://localhost:44398/';

  constructor(private httpClient: HttpClient) { }
 

  getCustomers(): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl +"api/"+ "customers/getall"
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
}
