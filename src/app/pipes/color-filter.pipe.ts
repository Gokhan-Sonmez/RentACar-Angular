import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/carDetail';


@Pipe({
  name: 'colorFilter'
})
export class ColorFilterPipe implements PipeTransform {

  transform(value: CarDetail[], colorSearch:number): CarDetail[] {
    return colorSearch?value
    .filter((c:CarDetail)=>c.colorId==colorSearch)
    :value;
  }
}
