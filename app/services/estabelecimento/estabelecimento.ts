import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Injectable()

export class EnterpriseService { 
  constructor(public http: Http){}
  private urlEnterprise = 'http://192.168.1.2:3000/api/enterprise/';
  private urlOrder = 'http://192.168.1.2:3000/api/order/';

  getEnterprises(){
    return this.http.get(this.urlEnterprise).map((res: Response) => res.json());
  }

  getOrders(idUser: string){
    return this.http.get(this.urlOrder +  idUser).map((res: Response) => res.json());
  }

  postOrder(body: any){
    return this.http.put(this.urlOrder, body).map((res: Response) => res.json());
  }

}
