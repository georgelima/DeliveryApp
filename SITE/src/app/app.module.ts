import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

@NgModule({
  imports: [ BrowserModule],       // module dependencies
  declarations: [ AppComponent],   // components and directives
  bootstrap: [ AppComponent ],     // root component
  providers: []                    // services
})
export class AppModule { }