import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, NavController } from '@ionic/angular';

import { ProductService } from '../product/product.service';
import { PermissionService } from '../permission.service';
import { Router } from '@angular/router';
import { DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-liste-signalements',
  templateUrl: './liste-signalements.page.html',
  styleUrls: ['./liste-signalements.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,NgxDatatableModule,HttpClientModule]
})
export class ListeSignalementsPage implements OnInit {
  hasPermission:boolean=false;
  pageSize: any;
  totalMessage:any;
  selectedMessage:any;
  @ViewChild(DatatableComponent) public table!: DatatableComponent;
   columns: any;
   signalements: any;
   public currentPageLimit: number = 10;
  public currentVisible: number = 3;

  public readonly pageLimitOptions = [
    {value: 5},
    {value: 10},
    {value: 25},
    {value: 50},
    {value: 100},
  ];
  public readonly visibleOptions = [
    {value: 1},
    {value: 3},
    {value: 5},
    {value: 10},
  ];
  // TODO[Dmitry Teplov] wrap dynamic limit in a separate component.
  public onLimitChange(limit: any): void {
    this.changePageLimit(limit.target.value);
    this.table.limit = this.currentPageLimit;
    this.table.recalculate();
    setTimeout(() => {
      console.log('444')
      if (this.table.bodyComponent.temp.length <= 0) {
        // TODO[Dmitry Teplov] find a better way.
        // TODO[Dmitry Teplov] test with server-side paging.
        if (this.table && this.table.limit!=null) {
          this.table.offset = Math.floor((this.table.rowCount - 1) / this.table.limit);
        }
        // this.table.offset = 0;
      }
    });
  }
  public onVisibleChange(visible: any): void {
    this.currentVisible = parseInt(visible, 10);
  }

  private changePageLimit(limit: any): void {
    this.currentPageLimit = parseInt(limit, 10);
  }
  constructor(private http: HttpClient, private alertController: AlertController, private permissionService: PermissionService,  private productService: ProductService, private router: Router) {
    this.columns = [
      { name: 'datePanne' },
      { name: 'numSerie' },
      { name: 'typePanne' },
      { name: 'repare' },
      { name: 'nomProduit' },
      { name: 'observations' },
      
    ];
  }
  filterByName(filterValue: any) {
    const searchTerm = filterValue.target.value.toLowerCase();
    // Apply the filter to the 'name' column
    if (searchTerm!="") {
      this.table.rows = this.signalements.filter((row: any) =>{
        return (
          row.nomProduit.toLowerCase().includes(searchTerm) ||
          row.numSerie.toLowerCase().includes(searchTerm) ||
          row.typePanne.toLowerCase().includes(searchTerm)
        );
      } );
    }else{
      this.table.rows = [...this.signalements];
    }
 
    
   
  }
  async afficheAlert(row:any){

    const alert = await this.alertController.create({
      header: 'Panne details',
      subHeader: 'Détails de la panne sélectionnée',
      message: "Date Panne: " + row.datePanne + "\n" +
               "Num Serie: " + row.numSerie + "\n" +
               "Type Panne: " + row.typePanne + "\n" +
               "Réparé: " + row.repare + "\n" +
               "Nom Produit: " + row.nomProduit + "\n" +
               "Observations: " + row.observations,
      buttons: ['OK']
    });

    await alert.present();

}

  ngOnInit() {
    this.hasPermission=localStorage.getItem('hasPrivilege')=== 'true'
  
    this.getSignalements();
  }
  getSignalements() {
    
    if(localStorage.getItem('idclient')){
      this.http.get<any[]>(this.productService.apiUrl+"/api/signalements/"+localStorage.getItem('idclient'), {})
      .subscribe(data => {
    
        console.log("this.http.get");
        console.log(data); // data received by server
        this.signalements  = data;
    
      })
    }else{
      if( this.hasPermission){
        this.http.get<any[]>(this.productService.apiUrl+"/api/signalements", {})
        .subscribe(data => {
      
          console.log("this.http.get");
          console.log(data); // data received by server
          this.signalements  = data;
      
        })
      }
    }
  

 /*    this.productService.getAll().subscribe((data) => {
      this.signalements = data;
    }); */
  }
  ajouterSignalement() {
    // Redirection vers la page du formulaire de signalement de panne
    this.router.navigate(['/formulaire-signalement-panne']);
  }
}
