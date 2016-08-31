import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { Auth, User, Push, PushToken } from '@ionic/cloud-angular';
import { PedidoPage } from '../pedido/pedido';

import { ModalLogin } from '../autenticacao/modalLogin';

@Component({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
  public endereco:any;
  constructor(public push: Push, public auth: Auth, public user: User, public modalCtrl: ModalController, public navCtrl: NavController, private loadingcontroller: LoadingController) {
    
  }

  entrar(){
    let modal = this.modalCtrl.create(ModalLogin);
    
    modal.onDidDismiss((data) => { 
      this.user = data.user;
      this.auth = data.auth;
    });
    
    modal.present();
  }

  sair(){
    let loader = this.loadingcontroller.create({
      content: "Aguarde...",
      duration: 3000
    });
    loader.present();
    this.auth.logout();
  }

  fazerPedido(){
    this.navCtrl.push(PedidoPage, { auth: this.auth, user: this.user });
  }
}
