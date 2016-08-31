import { Component } from '@angular/core';
import { DomSanitizationService } from '@angular/platform-browser';
import { ViewController, AlertController, LoadingController } from 'ionic-angular';

import {Auth, User, UserDetails, IDetailedError} from '@ionic/cloud-angular';

@Component({
  templateUrl: 'build/pages/autenticacao/modalLogin.html'
})

export class ModalLogin {
  private email: any;
  private pass: any;
  private errorMessage: string;

  constructor(private sanitizer: DomSanitizationService, public loadCtrl: LoadingController, public alertCtrl: AlertController, public viewCtrl: ViewController, public auth: Auth, public user: User){
    this.sanitizer = sanitizer;
  }

  validaCredenciais(email: string, pass: string){
    if (!email || !pass) {
      return false;
    }
  }

  voltar(){
    this.viewCtrl.dismiss({ auth: this.auth, user: this.user });
  }

  // LOGIN FACEBOOK
  loginFace(){
    this.auth.login('facebook').then((data) => {
      this.user.set('tipo', 0);
      this.user.save().then(() => this.viewCtrl.dismiss(this.user));
    }, (err) => { alert("Houve um erro, tente novamente!"); });
  }

  // LOGIN CASUAL
  loginCasual(){
      let details: UserDetails = {
        email: this.email || 'Nada informado',
        password: this.pass || 'Nada Informado'
      }

      let carregamento = this.loadCtrl.create({
        dismissOnPageChange: true,
        content: 'Aguarde...'
      });

      carregamento.present();

      this.auth.login('basic', details).then((token) => { 
        carregamento.dismiss().then(() => {
          this.user.set('tipo', 1);
          this.user.save().then(() => this.viewCtrl.dismiss({ user: this.user, auth: this.auth }));
        }); 
      }, (err) => {
        let alerta = this.alertCtrl.create({
            title: 'Ops',
            subTitle: 'Verifique suas credenciais!',
            buttons: ['OK']
        });
        carregamento.dismiss().then(() => {
          alerta.present();
        }); 
      });
    
  }

  // CADASTRO

  signUp(){
    let details: UserDetails = {
      email: this.email,
      password: this.pass
    }

    let carregamento = this.loadCtrl.create({
      dismissOnPageChange: true,
      content: 'Aguarde...'
    });

    carregamento.present();

    this.auth.signup(details).then(() => {
      
      this.auth.login("basic", details).then(token => {
        carregamento.dismiss().then(() => {
          this.viewCtrl.dismiss(this.user);
        });
      })


    }, err => {
      carregamento.dismiss().then(() => {
        for (let e of err.details){
          switch(e){
            case 'conflict_email':
              this.errorMessage = 'Email já cadastrado!';
              break;
            case 'required_password':
              this.errorMessage = 'Informe uma senha!';
              break;
            case 'required_email':
              this.errorMessage = 'Informe um email!';
              break;
            case 'conflict_username':
              this.errorMessage = 'Informe um nome de usuário válido!';
              break;
            case 'invalid_email':
              this.errorMessage = 'Informe um email válido!';
              break;
          }
        }
        let alerta = this.alertCtrl.create({
          title: 'Ops',
          subTitle: this.errorMessage,
          buttons: ['OK']
        }).present();
      });
      
    });
}
  requestPass(){
    location.href= this.auth.passwordResetUrl;
  }
}