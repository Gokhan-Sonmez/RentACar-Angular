import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/carDetail';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value:any[],filterText:string ): CarDetail[]{
  
    if(!filterText){
      return value  
    }
    return value.filter(it=>{   
        const carName = it.carName.toString().includes(filterText) 
        const colorName = it.colorName.toLowerCase().includes(filterText.toLowerCase())
        const brandName = it.brandName.toLowerCase().includes(filterText.toLowerCase())
        console.log( carName + colorName + brandName);
        return (carName + colorName + brandName );      
    }) 


    
}

}
