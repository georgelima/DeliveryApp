import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute ,Router } from '@angular/router';
import { EnterpriseService } from '../services/enterprise.service';
import { Enterprise } from '../empresa';

import 'rxjs/add/operator/subscribeOn';

declare var $: any;
declare var Materialize: any;

@Component({
  templateUrl: './detalhes.component.html',
  providers: [EnterpriseService],
  directives: [ROUTER_DIRECTIVES]
})

export class DetalhesEmpresaComponent {
  public _id: string;
  public enterprise: Enterprise;
  public status: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, public enterpriseSer: EnterpriseService){
    this.enterprise = new Enterprise();
    this.route.params.subscribe(params => {
      this._id = params['id']; 
    });  
  }

  ngOnInit(){
    this.enterpriseSer.getEnterprise(this._id).subscribe((data) => {
        this.enterprise._id = data._id;    
        this.enterprise.name = data.name;
        this.enterprise.street = data.address.street;
        this.enterprise.number = data.address.number;
        this.enterprise.neighborhood = data.address.neighborhood;
        this.enterprise.city = data.address.city;
        this.enterprise.phone = data.contact.phone;
        this.enterprise.email = data.contact.email;

        this.status = true;
      });
  }

  salvar(){
    this.enterpriseSer.putEnterprise(this.enterprise).subscribe((data) => {
      var $toastContent = $('<span>Dados atualizados! <i class="material-icons right">thumb_up</i></span>');
      Materialize.toast($toastContent, 4000);
    })
  }
}