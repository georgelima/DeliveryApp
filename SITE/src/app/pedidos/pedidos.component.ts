import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Enterprise } from '../empresa';
import { SortListPipe } from '../pipes/orderByData';
import { FormatDataPipe } from '../pipes/formataData';

declare var io: any;
declare var $: any;
declare var Materialize: any;

@Component({
  templateUrl: './pedidos.component.html',
  providers: [OrderService],
  pipes: [SortListPipe, FormatDataPipe]
})

export class PedidosComponent {
  public enterprises: any[];
  public showList: boolean = false;
  public orders: any[] = [];
  public socket: any;
  public itens: any[];

  public showButtonStatus: boolean = true;

  constructor(public entOrder: OrderService){
    this.socket = io('http://192.168.1.9:3000/');

    this.socket.on('conn', (data: any) => {
      console.log(data);
    });

    this.socket.on('newOrder', (data: any) => {
      this.carregaLista();
      var $toastContent = $('<span>Novo pedido! <i class="material-icons right">thumb_up</i></span>');
      Materialize.toast($toastContent, 4000);
    });

    this.carregaLista(); // TESTANDO BRANCH RC5

    console.log(this.orders);
  }

  carregaLista(){
    this.showList = false; 
    this.orders = [];
    this.entOrder.getOrders().subscribe((data) => {
      this.orders = data;
      console.log(data);
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

  openModal(_id: string){
    $('#' + _id).openModal();
  }

  changeStatus(order: any){
    let status: any = order.status;
    let nextStatus: any;

    if (status === "Processando"){
      nextStatus = "Preparando";
    }
    if (status === "Preparando"){
      nextStatus = "Saiu para entrega";
    }
    if (status === "Saiu para entrega"){
      nextStatus = "Finalizado";
    }
    
    
    this.entOrder.changeStatusOrder(order._id, { status: nextStatus }).subscribe((data: any) => {
      this.carregaLista();
    });
  }

  ngAfterViewInit(){
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  }

}