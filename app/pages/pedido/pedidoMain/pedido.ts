import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, AlertController, ToastController } from 'ionic-angular';
import { EnterpriseService } from '../../../services/estabelecimento/estabelecimento';
import { PedidoFilter } from '../../../pipes/pipePedido';
import { ItemModal } from '../modalItem/modalItem';
import { PedidoUserPage } from '../pedidoStage2/pedidoUser';
import { ModalPedido } from '../modalPedido/modalPedido';

import { Auth, User } from '@ionic/cloud-angular';

import 'rxjs/add/operator/subscribeOn';

@Component({
	templateUrl: 'build/pages/pedido/pedidoMain/pedido.html',
	providers:[EnterpriseService],
	pipes:[PedidoFilter]
})

export class PedidoPage {
	public enterprises: any;
	public cardapio: any;
	private pedido: any[] = [];
	private mostraCardapio: boolean;
	private confMudancaCardapio: boolean;

	constructor(public alertCtrl: AlertController, public loadCtrl: LoadingController,public auth: Auth, public user:User, public toastCtrl: ToastController, public modalCtrl: ModalController, private navCtrl: NavController, private params: NavParams, private loadingcontroller: LoadingController, private enterpriseServ: EnterpriseService) {
		this.mostraCardapio = false;
		this.auth = params.get("auth");
		this.user = params.get("user");
	}

	ngOnInit(){
		let loading = this.loadCtrl.create({
			content: 'Carregando...'
		});
		loading.present();
		this.enterpriseServ.getEnterprises().subscribe((data) => {
			loading.dismiss().then(() => {
				this.enterprises = data;
				// this.mostraCardapio = true;
			})
		})
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

	showConfirma(){
		let confirma = this.alertCtrl.create({
			title: 'Confirmar ação',
			message: 'Ao mudar o estabelecimento o carrinho atual será esvaziado! Você tem certeza?',
			buttons: [
				{
					text: 'Não',
					handler: () => {
						console.log('Clicou não');
					}
				},
				{
					text: 'Sim',
					handler: () => {
						console.log('Clicou sim');
					}
				}
			]
		});

		confirma.present();	
	}

	carregaCardapio(_id: string){
		// this.showConfirma();

		// if (!this.confMudancaCardapio){
		// 	return false;
		// 	// this.confirma.dismiss();
		// }

		this.pedido = [];
		let load = this.loadingcontroller.create({
			content: 'Carregando...'
		});
		load.present();
		load.dismiss().then(() => {
				let enterprise = this.enterprises.filter((item) => {
				return item._id === _id;
			});
			this.cardapio = enterprise[0].menu;
			this.mostraCardapio = true;
		})	
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