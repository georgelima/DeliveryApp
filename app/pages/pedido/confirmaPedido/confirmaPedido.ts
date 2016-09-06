import { Component } from '@angular/core';
import { NavParams, NavController, ModalController, LoadingController, ToastController } from 'ionic-angular';
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

  constructor(public modalCtrl: ModalController, public toastCtrl: ToastController, public loadCtrl: LoadingController ,public enterpriseServ: EnterpriseService, public params: NavParams, public navCtrl: NavController){
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
    let carregamento = this.loadCtrl.create({
      content: 'Processando...' 
    });

    let toast = this.toastCtrl.create({
      message: 'Pedido realizado com sucesso! Aguarde enquanto processamos...',
      duration: 5000,
      position: 'top'
    })

    carregamento.present();

    setTimeout(() => {
      this.enterpriseServ.postOrder({ 'userId': this.user.id, 'pedido': this.pedido, 'endereco': this.endereco, 'idEnterprise': this.idEnterprise, 'totalPrice': this.valorTotal }).subscribe((data) => {
        carregamento.dismiss().then(() => {
          toast.present().then(() => {
            this.navCtrl.remove(1, 2);
          });
        });
      });
    }, 2000)
  }
}