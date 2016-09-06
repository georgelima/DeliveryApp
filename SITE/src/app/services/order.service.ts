import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Injectable()

export class OrderService { 
  constructor(public http: Http){}
  private url = 'http://192.168.1.2:3000/api/order/';

  changeStatusOrder(idOrder: string, status: any) {
    return this.http.put(this.url + idOrder, status).map((res: Response) => {
      res.json();
    });
  }

  getOrders(idUser?: string){
    if (idUser){
      return this.http.get(this.url + idUser).map((res: Response) => res.json());
    }else {
      return this.http.get(this.url).map((res: Response) => res.json());
    }
    
  }
  
}


