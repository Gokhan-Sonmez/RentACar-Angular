import { Pipe, PipeTransform } from '@angular/core';

import { CarDetail } from '../models/carDetail';

@Pipe({
  name: 'brandFilter'
})
export class BrandFilterPipe implements PipeTransform {

  transform(value: CarDetail[], brandSearch:number): CarDetail[] {
    return brandSearch?value
    .filter((c:CarDetail)=>c.colorId==brandSearch)
    :value;
  }

}
