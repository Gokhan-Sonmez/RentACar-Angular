import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/carDetail';


@Pipe({
  name: 'colorFilter'
})
export class ColorFilterPipe implements PipeTransform {

  transform(value: CarDetail[], colorSearch:string): CarDetail[] {
    colorSearch = colorSearch?colorSearch.toLocaleLowerCase():""
    return colorSearch?value
    .filter((c:CarDetail)=>c.colorName.toLocaleLowerCase().indexOf(colorSearch)!==-1)
    :value;
  }
}
