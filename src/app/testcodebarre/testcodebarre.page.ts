import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, NavController } from '@ionic/angular';

import { ProductService } from '../product/product.service';
import { PermissionService } from '../permission.service';
import { Router } from '@angular/router';
import { DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
@Component({
  selector: 'testcodebarre',
  templateUrl: './testcodebarre.page.html',
  styleUrls: ['./testcodebarre.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],providers: [
    // ...
    BarcodeScanner,
    // ...
  ]
})
export class Testcodebarre implements OnInit {
  doing: string = "...";
  constructor(private barcodeScanner: BarcodeScanner) { }
  scan() {
    this.doing = "Starting scan...";
    this.barcodeScanner.scan().then(barcodeData => {
      this.doing = "Barcode data: "+ barcodeData;
     
     }).catch(err => {
      this.doing = "Error: "+err;
     });
  }
  ngOnInit() {

  }
 
}
