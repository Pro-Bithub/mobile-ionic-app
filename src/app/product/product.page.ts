import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { FilterProductsModule } from './filter-products.module';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,FilterProductsModule,ReactiveFormsModule,HttpClientModule]
})
export class ProductPage {
  products: Product[]=[];
  selectedFilter: string = '';

  constructor(private http: HttpClient,private productService: ProductService,private router: Router) {}
  filterProducts(selectedValue: any) {
  
    this.selectedFilter = selectedValue.detail.value;
  }
  redirectToCategoriesPage(productId: number) {
    console.log("redirectToCategoriesPage")
    this.router.navigate(['/categories'], { queryParams: { id: productId } });
  }

  ionViewWillEnter() {
    this.http.get<Product[]>(this.productService.apiUrl+"/api/categories", {})
  .subscribe(data => {

    console.log("this.http.get");
    console.log(data); // data received by server
    this.products = data;

  })



 /*    this.productService.getProducts().subscribe((data) => {
      console.log("this.http.get2");
      console.log(data); 
      this.products = data;
    }); */
  }

}
