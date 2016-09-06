import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Enterprise } from '../empresa';

declare var io: any;
declare var $: any;
declare var Materialize: any;

@Component({
  templateUrl: './pedidos.component.html',
  providers: [OrderService]
})

export class PedidosComponent {
  public enterprises: any[];
  public showList: boolean = false;
  public orders: any[] = [];
  public socket: any;
  public itens: any[];

  constructor(public entOrder: OrderService){
    this.socket = io('http://192.168.1.2:3000/');

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
    this.showList = false; 
    this.orders = [];
    this.entOrder.getOrders().subscribe((data) => {
      this.orders = data;
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
    this.entOrder.changeStatusOrder(order._id, { status: 'Preparando' }).subscribe((data: any) => {
      this.carregaLista();
    });
  }

  ngAfterViewInit(){
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  }

}