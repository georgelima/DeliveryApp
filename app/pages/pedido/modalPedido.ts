import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/pedido/modalPedido.html'
})

export class ModalPedido {
  private pedido: any[];
  constructor(public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController){
    this.pedido = params.get("pedido");
  }

  removeItem(itemSelecionado: any, indice: any){
    this.pedido.splice(indice, 1);
  }

  voltar(){
    this.viewCtrl.dismiss({ 'pedido': this.pedido });	
	}
}