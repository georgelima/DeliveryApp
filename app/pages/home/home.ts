import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { Auth, User, Push, PushToken } from '@ionic/cloud-angular';
import { PedidoPage } from '../pedido/pedidoMain/pedido';
import { ModalLogin } from '../autenticacao/modalLogin';

import { EnterpriseService } from '../../services/estabelecimento/estabelecimento';

import { TimeAgoFilter } from '../../pipes/timeAgo';
import { SortListPipe } from '../../pipes/orderByDate';

declare var io: any;

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [EnterpriseService],
  pipes: [TimeAgoFilter, SortListPipe]
})

export class HomePage {
  public endereco:any;
  public orders: any[];
  public socket: any;

  constructor(public entServ: EnterpriseService, public push: Push, public auth: Auth, public user: User, public modalCtrl: ModalController, public navCtrl: NavController, private loadingcontroller: LoadingController) {
    this.socket = io('http://192.168.1.9:3000');

    this.socket.on('changeStatus', (data) => {
      this.verificaSocket(data._id);
    });

    this.carregaLista();
  }

  verificaSocket(_id: string){
    
    this.orders.map((current) => {
      if (current._id === _id){
        this.carregaLista();
        return 0;
      }
    });
    
  }

  carregaLista(callback?: any){
    this.entServ.getOrders(this.user.id).subscribe((data) => {
      this.orders = data;
      // console.log(data);
      if (callback){
        callback();
      }

    });
  }

  entrar(){
    let modal = this.modalCtrl.create(ModalLogin);
    
    modal.onDidDismiss((data) => { 
      this.user = data.user;
      // this.auth = data.auth;
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
  
  ionViewDidEnter(){
    this.carregaLista();
  }

  atualizaPedidos(event: any){
    this.carregaLista(() => {
      event.complete();
    });
  }

  fazerPedido(){
    this.navCtrl.push(PedidoPage, { auth: this.auth, user: this.user });
  }
}
