import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product.model';


@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  transform(products: Product[], selectedFilter: string): Product[] {
    if (!selectedFilter  ) return products;
    if(selectedFilter=="tous") return products;
    return products.filter(p => p.name.toString() === selectedFilter);
  }

}
