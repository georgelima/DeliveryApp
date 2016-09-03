import { Component } from '@angular/core';
import { Enterprise } from '../empresa';
import { EnterpriseService } from '../services/enterprise.service';

import 'rxjs/add/operator/subscribeOn';

declare var Materialize: any;
declare var $: any;

@Component({
  templateUrl: './cadastro.component.html',
  providers: [EnterpriseService]
})

export class CadastroComponent {
  public enterprise: Enterprise;
  public formCadastro: any;

  constructor(public enterpriseSer: EnterpriseService){
    this.enterprise = new Enterprise();
  }

  cadastrar(event: any){
    event.preventDefault();
    this.enterpriseSer.postEnterprise(this.enterprise).subscribe((data) => {
      
      this.enterprise.name = '';
      this.enterprise.city = '';
      this.enterprise.email = '';
      this.enterprise.neighborhood = '';
      this.enterprise.number = '';
      this.enterprise.phone = '';
      this.enterprise.street = '';
      
      var $toastContent = $('<span>Empresa cadastrada! <i class="material-icons right">thumb_up</i></span>');
      Materialize.toast($toastContent, 4000);
    });
  }
}
