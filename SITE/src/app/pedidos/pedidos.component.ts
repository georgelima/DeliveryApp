import { Component } from '@angular/core';
import { EnterpriseService } from '../services/enterprise.service';
import { Enterprise } from '../empresa';

declare var io: any;
declare var $: any;
declare var Materialize: any;

@Component({
  templateUrl: './pedidos.component.html',
  providers: [EnterpriseService],
  directives: []
})

export class PedidosComponent {
  public enterprises: any[];
  public showList: boolean = false;
  public orders: any[] = [];
  public socket: any;
  public showOrder: boolean = false;

  constructor(public entServ: EnterpriseService){
    this.socket = io('http://127.0.0.1:3000/');

    this.socket.on('conn', (data: any) => {
      console.log(data);
    });

    this.socket.on('newOrder', (data: any) => {
      this.orders.push(data);
      var $toastContent = $('<span>Novo pedido! <i class="material-icons right">thumb_up</i></span>');
      Materialize.toast($toastContent, 4000);
    });

    this.entServ.getEnterprises().subscribe((data) => {
      this.enterprises = data;
      this.enterprises.forEach((enterprise) => {
        enterprise.orders.forEach((order: any) => {
          this.orders.push(order);
          console.log(order);
        })
      });
      this.showList = true;
    });
  }

  carregaPedido(){ 

  }

}