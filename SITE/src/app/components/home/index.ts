import {Component, OnInit} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';

@Component({
  selector: 'home',
  directives: [...FORM_DIRECTIVES],
  pipes: [],
  styles: [require('./style.scss')],
  template: require('./template.html')
})

export class Home implements OnInit {

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello Home');
  }

}
