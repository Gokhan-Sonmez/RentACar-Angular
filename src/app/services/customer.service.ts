import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  constructor(private httpClient: HttpClient) { }
 

  getCustomers(): Observable<ListResponseModel<Customer>> {
    let newPath = environment.apiUrl+ "customers/getall"
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
}
