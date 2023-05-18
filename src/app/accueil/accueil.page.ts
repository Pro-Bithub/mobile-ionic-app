import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';

import { FilterProductsModule } from '../product/filter-products.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { register } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FilterProductsModule,HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccueilPage implements OnInit {
  slider = [
    'assets/product/bg1.png',
    'assets/product/bg2.png',
    'assets/product/bg3.png'
  ]

  constructor() { }

  ngOnInit() {
   
  }

  



}
