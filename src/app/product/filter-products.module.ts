import { NgModule } from '@angular/core';
import { FilterProductsPipe } from './filter-products.pipe';

@NgModule({
  declarations: [FilterProductsPipe],
  exports: [FilterProductsPipe]
})
export class FilterProductsModule {}
