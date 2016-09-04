import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Injectable()

export class EnterpriseService { 
  constructor(public http: Http){}
  private url = 'http://127.0.0.1:3000/api/enterprise/';

  getEnterprises(){
    return this.http.get(this.url).map((res: Response) => res.json());
  }

  getOrder(_id: string){
    return this.http.get(this.url + _id).map((res: Response) => res.json());
  }

  postOrder(body: any){
    return this.http.put(this.url + 'order/', body).map((res: Response) => res.json());
  }

}
