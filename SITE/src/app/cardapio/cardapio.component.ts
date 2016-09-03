import { Component } from '@angular/core';
import { EnterpriseService } from '../services/enterprise.service';
import { ActivatedRoute } from '@angular/router';
import { Enterprise } from '../empresa';
import { FORM_DIRECTIVES } from '@angular/forms';

declare var $: any;
declare var Materialize: any;

@Component({
  templateUrl: './cardapio.component.html',
  providers: [EnterpriseService],
  directives: [FORM_DIRECTIVES]
})

export class CardapioComponent {
  public _id: string;
  public menu: {name: string, price: number, description: string, kind: string}[];
  public status: boolean = false;
  public enterprise: Enterprise;
  public item: { name: string, price: number, description: string, kind: string } = {name: '', price: 0, description: '', kind: ''};

  constructor(public entepriseServ: EnterpriseService, public route: ActivatedRoute){
    this.enterprise = new Enterprise();
    
    route.params.subscribe((params) => {
      this._id = params['id'];
    });

    this.carregaCardapio();
  }

  carregaCardapio(){
    this.entepriseServ.getEnterprise(this._id).subscribe((data) => {
      this.menu = data.menu;
      this.enterprise = data;

      this.status = true;
    });
  }

  ngAfterViewInit(){
    $('select').material_select();
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  }

  mudaTipo(event: any){
    console.log(event);
  }

  cadastrar(event: any){
    event.preventDefault();

    this.entepriseServ.putMenu(this._id, this.item).subscribe((data) => {
      Materialize.toast('Item adicionado!', 1500);
      this.carregaCardapio();
    });
  }

  removeItem(event: any, item: any){
    this.entepriseServ.deleteItemMenu(this._id, item._id).subscribe((data) => {
      Materialize.toast('Item removido!', 1500);
      this.carregaCardapio();
    })
  }
}