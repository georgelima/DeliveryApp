import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Enterprise } from '../empresa';

import 'rxjs/add/operator/map';

@Injectable()

export class EnterpriseService { 
  constructor(public http: Http){}
  private url = 'http://127.0.0.1:3000/api/enterprise/';

  getEnterprises(){
    return this.http.get(this.url).map((res: Response) => res.json());
  }

  getEnterprise(_id: string){
    return this.http.get(this.url + _id).map((res: Response) => res.json());
  }

  postEnterprise(body: Enterprise){
    return this.http.post(this.url, body).map((res: Response) => res.json());
  }

  deleteEnterprise(_id: string){
    return this.http.delete(this.url + _id).map((res: Response) => res.json());
  }

  putEnterprise(body: Enterprise) {
    return this.http.put(this.url, body).map((res: Response) => res.json());
  }

  putMenu(_id: string, item: any) {
    return this.http.put(this.url + _id + '/menu', item).map((res: Response) => res.json());
  }

  deleteItemMenu(id: string, idItem: string){
    return this.http.delete(this.url + id + '/menu/' + idItem).map((res: Response) => {
      res.json();
    });
  }
}


