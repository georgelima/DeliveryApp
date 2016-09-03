import { Component, provide } from '@angular/core';
import { ionicBootstrap, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { CloudSettings, provideCloud, Push, PushToken } from '@ionic/cloud-angular';

import { HomePage } from './pages/home/home';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '3041fbbf',
  },
  'push': {
    'sender_id': '423834709081',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434',
        'sound': true
      }
    }
  }
};


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, public push: Push) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need      
      // var notificacoes = this.push.register().then((t: PushToken) => this.push.saveToken(t)).then((t: PushToken) => console.log('Token Salvo', t.token));

      // this.push.rx.notification()
      // .subscribe((msg) => {
      //   console.log(msg.title + ': ' + msg.text);
      // });

      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, [provideCloud(cloudSettings)])