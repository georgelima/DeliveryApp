import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()

export class IonicService { 
  constructor(public http: Http){}
  private url = 'https://api.ionic.io/auth/users';

  getUsers(){
    let headers = new Headers({ 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNGQ5NjQ5Zi04ZjI2LTQxZGEtYTI0Ni01ODgwYjc5ODUwZTUifQ.4Lo6RZa_9fB9HB7GzfmdDCiab9vtbXjiVbvpGXEvZPc' })
    let options = new RequestOptions({ 'headers': headers });
    return this.http.get(this.url, options).map((res: Response) => res.json());
  }

}
