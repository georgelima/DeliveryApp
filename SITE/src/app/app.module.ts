import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// COMPONENTES
import { AppComponent } from './app.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { ListarEmpresasComponent } from './lista/listaEmpresas.component';
import { DetalhesEmpresaComponent } from './detalhes/detalhes.component';
import { CardapioComponent } from './cardapio/cardapio.component';
import { PedidosComponent } from './pedidos/pedidos.component';

// PROVIDERS
import { EnterpriseService } from './services/enterprise.service';
import { IonicService } from './services/ionic.service';
import { OrderService } from './services/order.service';

// ROUTER
import { routing } from './app.routes';

// PIPES
import { SortListPipe } from './pipes/orderByData';
import { FormatDataPipe } from './pipes/formataData';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		routing
	],
	declarations: [ 
		AppComponent, 
		CadastroComponent, 
		HomeComponent, 
		ListarEmpresasComponent, 
		DetalhesEmpresaComponent, 
		CardapioComponent, 
		PedidosComponent,
		SortListPipe,
		FormatDataPipe 
	],
	bootstrap: [ AppComponent ],
	providers: [ EnterpriseService, IonicService, OrderService ]
})
export class AppModule { }