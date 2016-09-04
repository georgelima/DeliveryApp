import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { EnterpriseService } from '../../../services/estabelecimento/estabelecimento';

import { User, Auth } from '@ionic/cloud-angular';

@Component({
  templateUrl: 'build/pages/pedido/confirmaPedido/confirmaPedido.html',
  providers: [EnterpriseService]
})

export class ConfirmaPedido {
  public user: User;
  public auth: Auth;
  public pedido: any[];
  public endereco: { rua: string, bairro: string, numero: string, cidade: string, infoAdicionais?: string }
  public idEnterprise: string;

  public valores:any[];
  public valorTotal: number;

  constructor(public enterpriseServ: EnterpriseService, public params: NavParams, public navCtrl: NavController){
    this.auth = params.get("auth");
    this.user = params.get("user");
    this.pedido = params.get('pedido');
    this.endereco = params.get('endereco');
    this.valores = [];
    this.idEnterprise = params.get("idEnterprise");

    this.pedido.forEach((item) => {
      this.valores.push(item.price);
    });

    this.valorTotal = this.valores.reduce((previous, current, i, array) => {
      return previous + current;
    }, 0);

  }

  confirmar(){
    console.log(this.user);
    console.log(this.pedido);
    console.log(this.endereco);

    this.enterpriseServ.postOrder({ 'userId': this.user.id, 'pedido': this.pedido, 'endereco': this.endereco, 'idEnterprise': this.idEnterprise }).subscribe((data) => {
      console.log('Foi');
    });
  }
}