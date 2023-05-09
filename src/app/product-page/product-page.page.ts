import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product.model';
import { Router } from '@angular/router';
import { FilterProductsModule } from '../product/filter-products.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.page.html',
  styleUrls: ['./product-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FilterProductsModule,HttpClientModule]
})
export class ProductpagePage implements OnInit {
  products: Product[]=[];
  categoryId: number=0;
  selectedFilter: string = '';
  constructor( private alertController: AlertController,private http: HttpClient,private productService: ProductService,private route: ActivatedRoute,private router: Router) { }
  redirectToProduitPage(productId: number) {

    this.router.navigate(['/categories'], { queryParams: { id: productId } });
  }
  filterProducts(selectedValue: any) {
  
    this.selectedFilter = selectedValue.detail.value;
  }
  ngOnInit() {
    this.categoryId = this.route.snapshot.queryParams['id'];
  }
  
  async affiche_details(product:any) {
    const alert = await this.alertController.create({
      header: 'détails du produit',
      subHeader: product.title,
      message:  `
      ${product.description}
    `,
      buttons: ['OK'],
    });
  
    await alert.present();
  }
  ionViewWillEnter() {
    this.categoryId = parseInt( this.route.snapshot.queryParams['id']);

    this.http.get<Product[]>(this.productService.apiUrl+"/api/produits/byidcat/"+this.categoryId, {})
    .subscribe(data => {
  
      console.log("this.http.products");
      console.log(data); // data received by server
       this.products = data;
  
    })
 /*    this.productService.getsousCategories(this.categoryId).subscribe((data) => {
      this.sousCategories = data;
    }); */
  }


}
