import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, ToastController } from 'ionic-angular';
import { EstabelecimentoService } from '../../services/estabelecimento/estabelecimento';
import { PedidoFilter } from './pipePedido';
import { ItemModal } from './modalItem';
import { PedidoUserPage } from './pedidoUser';
import { ModalPedido } from './modalPedido';

import { Auth, User } from '@ionic/cloud-angular';

@Component({
	templateUrl: 'build/pages/pedido/pedido.html',
	providers:[EstabelecimentoService],
	pipes:[PedidoFilter]
})

export class PedidoPage {
	public estabelecimentos: any;
	public cardapios: any;
	private pedido: any[] = [];
	private mostraCardapio: boolean;

	constructor(public auth: Auth, public user:User, public toastCtrl: ToastController, public modalCtrl: ModalController, private navCtrl: NavController, private params: NavParams, private loadingcontroller: LoadingController, private estabelecimentoservice: EstabelecimentoService) {
		this.mostraCardapio = false;
		this.auth = params.get("auth");
		this.user = params.get("user");
		this.estabelecimentos = estabelecimentoservice.listaEstabelecimentos();
		this.cardapios = estabelecimentoservice.listaCardapio();
	}

	verPedido(){
		let modal = this.modalCtrl.create(ModalPedido, { 'pedido': this.pedido }, { showBackdrop: false });
		
		modal.onDidDismiss((data) => this.pedido = data.pedido);
		
		modal.present();
	}

	verItem(item){
		let modal = this.modalCtrl.create(ItemModal, { 'item': item });
		modal.present();
	}

	carregaCardapio($event){
		let load = this.loadingcontroller.create({
			content: 'Carregando...'
		});
		load.present();
		setTimeout(() => { this.mostraCardapio = true; load.dismiss(); }, 1000);	
	}

	adicionaItem(item){
		let load = this.loadingcontroller.create({
			content: 'Adicionando...',
			duration: 1300
		});

		let toast = this.toastCtrl.create({
			message: 'Produto adicionado ao pedido!',
			duration: 1000,
			showCloseButton: true,
			closeButtonText: "OK"
		});

		load.present();
		this.pedido.push(item);
		// setTimeout(() => { toast.present(); }, 1300);
		
		console.log(this.pedido);
	}
	
	next(){
		this.navCtrl.push(PedidoUserPage, { user: this.user, auth: this.auth, pedido: this.pedido });
	}

	voltar(){	
		this.navCtrl.pop();
	}

	sair(){
	    console.log(this.user);
	    let loader = this.loadingcontroller.create({
	      content: "Aguarde...",
	      duration: 3000
	    });
	    loader.present();
	    this.auth.logout();
	    this.navCtrl.pop();
  	}
}