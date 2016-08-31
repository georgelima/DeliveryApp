import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Auth, User } from '@ionic/cloud-angular';

import { ConfirmaPedido } from '../confirmaPedido/confirmaPedido';

@Component({
  templateUrl: 'build/pages/pedido/pedidoUser.html'
})

export class PedidoUserPage {
  private pedido: any[];

  public rua: string;
  public bairro: string;
  public numero: string;
  public cidade: string;
  public infoAdicionais: string;

  constructor(public loadCtrl: LoadingController, public auth: Auth, public user: User,private navCtrl: NavController, private params: NavParams) {
		this.auth = params.get("auth");
    this.pedido = params.get("pedido");
    this.user = params.get("user");

    let endereco = this.user.get('endereco', null);

    if (endereco != null){
      this.rua = endereco.rua;
      this.bairro = endereco.bairro;
      this.numero = endereco.numero;
      this.cidade = endereco.cidade;
      this.infoAdicionais = endereco.infoAdicionais;
    }

	}

  salvaEndereco(){
    let carregando = this.loadCtrl.create({
      content: 'Salvando...'
    });
    
    carregando.present();

    let endereco = {
      rua: this.rua,
      bairro: this.bairro,
      numero: this.numero,
      cidade: this.cidade,
      infoAdicionais: this.infoAdicionais
    }

    this.user.set('endereco', endereco);
    this.user.save().then(() => { carregando.dismiss(); }).catch(() => alert("Houve um erro!"));
  }

  voltar(){
    this.navCtrl.pop();
  }

  next(){
    let endereco = this.user.get('endereco', null);
    let enderecoPedido;

    if (endereco === null){
      enderecoPedido = {
        rua: this.rua,
        bairro: this.bairro,
        numero: this.numero,
        cidade: this.cidade,
        infoAdicionais: this.infoAdicionais
      }
    }else {
      enderecoPedido = endereco;
    }

    this.navCtrl.push(ConfirmaPedido, { auth: this.auth, user: this.user, pedido: this.pedido, endereco: enderecoPedido })
  }
}