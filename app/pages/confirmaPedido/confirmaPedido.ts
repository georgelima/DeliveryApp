import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

import { User, Auth } from '@ionic/cloud-angular';

@Component({
  templateUrl: 'build/pages/confirmaPedido/confirmaPedido.html'
})

export class ConfirmaPedido {
  public user: User;
  public auth: Auth;
  public pedido: any[];
  public endereco: { rua: string, bairro: string, numero: string, cidade: string, infoAdicionais?: string }

  constructor(public params: NavParams, public navCtrl: NavController){
    this.auth = params.get("auth");
    this.user = params.get("user");
    this.pedido = params.get('pedido');
    this.endereco = params.get('endereco');
  }

  confirmar(){
    console.log("Pedido: " + this.pedido);
    console.log("Endereco: " + this.endereco);
  }
}