import { Pipe, PipeTransform } from '@angular/core';

import { CarDetail } from '../models/carDetail';

@Pipe({
  name: 'brandFilter'
})
export class BrandFilterPipe implements PipeTransform {

  transform(value: CarDetail[], brandSearch:string):CarDetail[] {
    brandSearch = brandSearch?brandSearch.toLocaleLowerCase():""
    return brandSearch?value
    .filter((b:CarDetail)=>b.brandName.toLocaleLowerCase().indexOf(brandSearch)!==-1)
    :value;
  }

}
