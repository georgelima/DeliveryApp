import { Component } from '@angular/core';
import { EnterpriseService } from '../services/enterprise.service';
import { ROUTER_DIRECTIVES } from '@angular/router';

import 'rxjs/add/operator/subscribeOn';

declare var Materialize: any;
declare var $: any;

@Component({
  templateUrl: './listaEmpresas.component.html',
  providers: [EnterpriseService],
  directives: [ROUTER_DIRECTIVES]
})

export class ListarEmpresasComponent{
  public enterprises: any[];
  constructor(public enterpriseSer: EnterpriseService){
    this.carregaLista();
  }

  carregaLista(){
    this.enterpriseSer.getEnterprises().subscribe((data) => {
      this.enterprises = data;
    });
  }

  openModal(){
    $('#modal1').openModal();
  }

  removerEmpresa(enterprise: any){
    this.enterpriseSer.deleteEnterprise(enterprise._id).subscribe((data) => {
      var $toastContent = $('<span>Empresa removida! <i class="material-icons right">thumb_up</i></span>');
      Materialize.toast($toastContent, 4000);
      this.carregaLista();
    });
  }
}