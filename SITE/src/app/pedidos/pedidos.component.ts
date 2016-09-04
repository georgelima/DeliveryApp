import { Component } from '@angular/core';
import { EnterpriseService } from '../services/enterprise.service';
import { Enterprise } from '../empresa';
import { MaterializeDirective } from 'angular2-materialize';

declare var $: any;

@Component({
  templateUrl: './pedidos.component.html',
  providers: [EnterpriseService],
  directives: [MaterializeDirective]
})

export class PedidosComponent {
  public pedidos: any[] = [];
  public enterprises: any[];
  public showList: boolean = false;

  constructor(public entServ: EnterpriseService){
    this.entServ.getEnterprises().subscribe((data) => {
      this.enterprises = data;
      this.showList = true;
    });
  }

}