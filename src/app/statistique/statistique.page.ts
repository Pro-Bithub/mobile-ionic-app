import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule, NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from '../product/product.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.page.html',
  styleUrls: ['./statistique.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule,HttpClientModule],providers: [
    // ...
    BarcodeScanner,
    // ...
  ]
})
export class StatistiquePage implements OnInit {
  clientCount: number=0;
  panneCount: number=0;
  clientsWith10Pannes: any[] = [];;
  constructor(    private route: ActivatedRoute,
    private toastCtrl: ToastController,private navCtrl: NavController,private http: HttpClient,private alertController: AlertController,private productService: ProductService,private formBuilder: FormBuilder,private barcodeScanner: BarcodeScanner) {
   
  }
  ngOnInit() {
    this.http.get<any>(this.productService.apiUrl+"/api/clients/statistique")
    .subscribe(data => {
      this.clientCount = data.clientCount;
      this.panneCount = data.panneCount;
      this.clientsWith10Pannes = data.clientsWith10Pannes;
    })
  }
}
