import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/pedido/modalPedido/modalPedido.html'
})

export class ModalPedido {
  private pedido: any[];
  public valorTotal: number;
  public valores: any[];

  constructor(public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController){
    this.pedido = params.get("pedido");
    this.valores = [];

    this.pedido.forEach((item) => {
      this.valores.push(item.price);
    });

    this.valorTotal = this.valores.reduce((previous, current, i, array) => {
      return previous + current;
    }, 0);
  }

  removeItem(itemSelecionado: any, indice: any){
    this.valorTotal -= itemSelecionado.price;
    
    this.pedido.splice(indice, 1);
  }

  voltar(){
    this.viewCtrl.dismiss({ 'pedido': this.pedido });	
	}
}