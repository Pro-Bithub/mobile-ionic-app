import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product.model';
import { Router } from '@angular/router';
import { FilterProductsModule } from '../product/filter-products.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.page.html',
  styleUrls: ['./categories-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FilterProductsModule,HttpClientModule]
})
export class CategoriesPagePage implements OnInit {
  sousCategories: Product[]=[];
  categoryId: number=0;
  selectedFilter: string = '';
  constructor(private http: HttpClient,private productService: ProductService,private route: ActivatedRoute,private router: Router) { }
  redirectToProduitPage(productId: number) {
    console.log("redirectToCategoriesPage")
    this.router.navigate(['/categories'], { queryParams: { id: productId } });
  }
  filterProducts(selectedValue: any) {
  
    this.selectedFilter = selectedValue.detail.value;
  }
  ngOnInit() {
    this.categoryId = this.route.snapshot.queryParams['id'];
  }
  ionViewWillEnter() {
    this.categoryId = parseInt( this.route.snapshot.queryParams['id']);

    this.http.get<Product[]>(this.productService.apiUrl+"/api/souscategories/"+this.categoryId, {})
    .subscribe(data => {
  
      console.log("this.http.souscategories");
      console.log(data); // data received by server
       this.sousCategories = data;
  
    })
 /*    this.productService.getsousCategories(this.categoryId).subscribe((data) => {
      this.sousCategories = data;
    }); */
  }


}
