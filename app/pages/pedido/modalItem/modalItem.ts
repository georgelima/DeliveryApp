import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/pedido/modalItem/modalItem.html'
})

export class ItemModal {
  public item: any;
  constructor(public navparams: NavParams, public navCtrl: NavController){
    this.item = navparams.get('item');
  }
  
  voltar(){	
		this.navCtrl.pop();
	}
}