import { Pipe, PipeTransform, Injectable } from '@angular/core';

import * as moment from 'moment';
import 'moment/locale/pt-br';

@Pipe({
    name: 'filtraDatta'
})
@Injectable()
export class TimeAgoFilter implements PipeTransform {
  transform(date: any): any {    
    moment.locale('pt-BR');
    return moment(date).from(new Date());
  }
}