import { Component } from '@angular/core';;
import { EnterpriseService } from '../services/enterprise.service';
import { IonicService } from '../services/ionic.service';
import { Enterprise } from '../empresa';

import 'rxjs/add/operator/subscribeOn';

@Component({
  templateUrl: './home.component.html'
})

export class HomeComponent {
  public enterprises: any[] = [];
  public users: any[] = [];
  

  constructor(public enterpriseSer: EnterpriseService, public ionicService: IonicService){
    this.enterpriseSer.getEnterprises().subscribe((data) => {
      this.enterprises = data;
    });

    this.ionicService.getUsers().subscribe((users) => {
      this.users = users.data;
    });
  }
}
