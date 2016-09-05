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
  public itens: any[];

  constructor(public entServ: EnterpriseService){
    this.socket = io('http://127.0.0.1:3000/');

    this.socket.on('conn', (data: any) => {
      console.log(data);
    });

    this.socket.on('newOrder', (data: any) => {
      this.carregaLista();
      var $toastContent = $('<span>Novo pedido! <i class="material-icons right">thumb_up</i></span>');
      Materialize.toast($toastContent, 4000);
    });

    this.carregaLista();

    console.log(this.orders);
  }

  carregaLista(){
    this.entServ.getEnterprises().subscribe((data) => {
      this.enterprises = data;
      this.enterprises.forEach((enterprise) => {
        let orderFinnaly = { 'enterprise': enterprise.name, order: {} }
        enterprise.orders.forEach((order: any) => {
          orderFinnaly.order = order;
          this.orders.push(orderFinnaly);
        })
      });
      this.showList = true;
    });
  }

  public i = 0;
  carregaItens(order: any){
    if (this.i % 2 == 0) {
      this.itens = order.order.items;
    }else {
      this.itens = [];
    }
    this.i++;
  }

  openModal(){
    $('#modal1').openModal();
  }

  changeStatus(order: any){
    console.log(order);
  }

  ngAfterViewInit(){
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  }

}