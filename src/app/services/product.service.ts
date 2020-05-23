import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { UserService } from './user.service';
import { ResponseMessageProduct } from '../models/response-message-product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = `${environment.api}/v1/product`;

  constructor(public http: HttpClient, public userService: UserService) { }


  create(product: Product) {
    return this.http.post<ResponseMessageProduct>(this.url, product, {
      headers: new HttpHeaders().set('token', this.userService.retrieveToken())
    });
  }

  findById(productId: number) {
    return this.http.get<ResponseMessageProduct>(`${this.url}/${productId}`, {
      headers: new HttpHeaders().set('token', this.userService.retrieveToken())
    });
  }

  findAll() {
    return this.http.get<ResponseMessageProduct>(this.url, {
      headers: new HttpHeaders().set('token', this.userService.retrieveToken())
    });
  }

  deleteById(productId: number) {
    return this.http.delete(`${this.url}/${productId}`, {
      headers: new HttpHeaders().set('token', this.userService.retrieveToken())
    });
  }

  updateById(productId: number, product: Product) {
    return this.http.put<ResponseMessageProduct>(`${this.url}/${productId}`, product, {
      headers: new HttpHeaders().set('token', this.userService.retrieveToken())
    });
  }
}
