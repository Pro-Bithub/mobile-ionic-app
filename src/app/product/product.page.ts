import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { FilterProductsModule } from './filter-products.module';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,FilterProductsModule,ReactiveFormsModule]
})
export class ProductPage {
  products: Product[]=[];
  selectedFilter: string = '';

  constructor(private productService: ProductService,private router: Router) {}
  filterProducts(selectedValue: any) {
  
    this.selectedFilter = selectedValue.detail.value;
  }
  redirectToCategoriesPage(productId: number) {
    console.log("redirectToCategoriesPage")
    this.router.navigate(['/categories'], { queryParams: { id: productId } });
  }

  ionViewWillEnter() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

}
