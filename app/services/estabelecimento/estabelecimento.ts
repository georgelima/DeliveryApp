import  { Injectable } from '@angular/core';


const ESTABELECIMENTOS = [
	{ id: 0, nome: 'Cafe e Cia' },
	{ id: 1, nome: 'Dogão' },
	{ id: 2, nome: 'Lek Lanches' }
];

const CARDAPIO = [
	{ id: 0, produto: 'Sanduíche', preco: 10.00 },
	{ id: 1, produto: 'Refrigerante', preco: 6.00 },
	{ id: 2, produto: 'Pizza', preco: 30.00 }
];

@Injectable()
export class EstabelecimentoService {
	listaEstabelecimentos(){
		return ESTABELECIMENTOS;
	}

	listaCardapio(){
		return CARDAPIO;
	}
}