import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'filtrapedido'
})
@Injectable()
export class PedidoFilter implements PipeTransform {
  transform(cardapio: any[], value: any): any {
    if (value === undefined || value === '') {
      return cardapio;
    }else {
      return cardapio.filter(item => item.produto.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
  }
}