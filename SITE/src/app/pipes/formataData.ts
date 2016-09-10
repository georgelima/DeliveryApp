import { Pipe, PipeTransform, Injectable } from '@angular/core';

import * as moment from 'moment';
import 'moment/locale/pt-br';

@Pipe({
    name: 'formataData'
})
@Injectable()
export class FormatDataPipe implements PipeTransform {
  transform(data: any[]): any {
  	return moment(data).format('lll');    
  }
}