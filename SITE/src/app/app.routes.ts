import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { ListarEmpresasComponent } from './lista/listaEmpresas.component';
import { DetalhesEmpresaComponent } from './detalhes/detalhes.component';
import { CardapioComponent } from './cardapio/cardapio.component';
import { PedidosComponent } from './pedidos/pedidos.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'cadastrar-empresa',
    component: CadastroComponent
  },
  {
    path: 'listar-empresas',
    component: ListarEmpresasComponent
  },
  {
    path: 'detalhes-empresa/:id',
    component: DetalhesEmpresaComponent
  },
  {
    path: 'detalhes-empresa/:id/cardapio',
    component: CardapioComponent
  },
  {
    path: 'listar-pedidos',
    component: PedidosComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
