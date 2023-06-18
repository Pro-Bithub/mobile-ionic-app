import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, NavController } from '@ionic/angular';

import { ProductService } from '../product/product.service';
import { PermissionService } from '../permission.service';
import { Router } from '@angular/router';
import {
  DatatableComponent,
  NgxDatatableModule,
} from '@swimlane/ngx-datatable';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-liste-client',
  templateUrl: './liste-client.page.html',
  styleUrls: ['./liste-client.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    HttpClientModule,
  ],
  providers: [DatePipe],
})
export class ListeClientsPage implements OnInit {
  hasPermission: boolean = false;
  pageSize: any;
  totalMessage: any;
  selectedMessage: any;
  @ViewChild(DatatableComponent) public table!: DatatableComponent;
  columns: any;
  Clients: any;
  public currentPageLimit: number = 10;
  public currentVisible: number = 3;

  public readonly pageLimitOptions = [
    { value: 5 },
    { value: 10 },
    { value: 25 },
    { value: 50 },
    { value: 100 },
  ];
  public readonly visibleOptions = [
    { value: 1 },
    { value: 3 },
    { value: 5 },
    { value: 10 },
  ];

  public onVisibleChange(visible: any): void {
    this.currentVisible = parseInt(visible, 10);
  }

  private changePageLimit(limit: any): void {
    this.currentPageLimit = parseInt(limit, 10);
  }
  constructor(
    private datePipe: DatePipe,
    private http: HttpClient,
    private alertController: AlertController,
    private permissionService: PermissionService,
    private productService: ProductService,
    private router: Router
  ) {
    this.columns = [
      { name: 'nom' },
      { name: 'prenom' },
      { name: 'telephone' },
      { name: 'adresse' },
   
    ];
  }
  filterByName(filterValue: any) {
    const searchTerm = filterValue.target.value.toLowerCase();
    // Apply the filter to the 'name' column
    if (searchTerm != '') {
      this.table.rows = this.Clients.filter((row: any) => {
        return (
          row.nomProduit.toLowerCase().includes(searchTerm) ||
          row.numSerie.toLowerCase().includes(searchTerm) ||
          row.typePanne.toLowerCase().includes(searchTerm)
        );
      });
    } else {
      this.table.rows = [...this.Clients];
    }
  }
  async afficheAlert(row: any) {
    const alert = await this.alertController.create({
      header: 'Client details',
      subHeader: 'Détails de la Client sélectionnée',
      message:
        'nom: ' +
        row.nom +
        '\n' +
        'prenom: ' +
        row.prenom +
        '\n' +
        'telephone: ' +
        row.telephone +
        '\n' +
        'username: ' +
        row.username +
        '\n' +
        'adresse: ' +
        row.adresse ,
      buttons: ['OK'],
    });

    await alert.present();
  }


  async modify(row: any) {
    const alert = await this.alertController.create({
      header: 'Modifier le client',
      subHeader: 'Modifier les informations du client',
      inputs: [
        {
          name: 'nom',
          type: 'text',
          placeholder: 'Nom',
          value: row.nom,
        },
        {
          name: 'prenom',
          type: 'text',
          placeholder: 'Surnom (max 8 caractères)',
          value: row.prenom,
        
        },
        {
          name: 'telephone',
          type: 'tel',
          placeholder: 'Numéro de téléphone',
          value: row.telephone,
        },
        {
          name: 'username',
          type: 'text',
          placeholder: 'Nom d\'utilisateur',
          value: row.username,
        },
        {
          name: 'address',
          type: 'text',
          placeholder: 'Adresse',
          value: row.adresse,
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Enregistrer',
          handler: (data) => {
            let updatedClient = {
              id:row.id,
              ...data
            };
            console.log('data :', data);
            // Effectuer l'opération d'enregistrement avec l'objet updatedClient 
            console.log('Client mis à jour :', updatedClient);

            this.http
              .put(
                `${this.productService.apiUrl}/api/clients/${row.id}`,data
              )
              .subscribe(
                () => {
                  this.getClients();
                },
                (error) => {
                  // Gestion des erreurs lors de la suppression
                }
              );

          },
        },
      ],
    });
  
    await alert.present();
  }
  
  
  async ajouterClient() {
    const alert = await this.alertController.create({
      header: 'Ajouter un client',
      subHeader: 'Ajouter un nouveau client',
      inputs: [
        {
          name: 'nom',
          type: 'text',
          placeholder: 'Nom',
          value: '',
        },
        {
          name: 'prenom',
          type: 'text',
          placeholder: 'Prénom',
          value: '',
        },
        {
          name: 'telephone',
          type: 'tel',
          placeholder: 'Numéro de téléphone',
          value: '',
        },
       
        {
          name: 'addresse',
          type: 'text',
          placeholder: 'Adresse',
          value: '',
        },
        {
          name: 'username',
          type: 'text',
          placeholder: 'Nom d\'utilisateur',
          value: '',
        },
        {
          name: 'password',
          type: 'text',
          placeholder: 'mot de passe',
          value: '',
        },

      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Enregistrer',
          handler: (data) => {
            const newClient = {
              ...data
            };
            // Effectuer l'opération d'enregistrement avec l'objet newClient
            console.log('Nouveau client :', newClient);

            
            this.http
              .post(
                `${this.productService.apiUrl}/api/clients`,newClient
              )
              .subscribe(
                () => {
                  this.getClients();
                },
                (error) => {
                  // Gestion des erreurs lors de la suppression
                }
              );

          },
        },
      ],
    });
  
    await alert.present();
  }

  
  ngOnInit() {}

  ionViewDidEnter() {
    // Code to be executed when the page has fully entered and is now the active page
    console.log('Liste Clients Page entered!');

    // Perform any necessary updates or actions here
    this.hasPermission = localStorage.getItem('hasPrivilege') === 'true';

    this.getClients();
  }
  async supprimer(row: any) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Voulez-vous vraiment supprimer ce Client ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            // Action à effectuer lorsque l'utilisateur clique sur "Annuler"
          },
        },
        {
          text: 'Supprimer',
          handler: () => {
            // Logique de suppression du Client en utilisant this.http
            this.http
              .delete(
                `${this.productService.apiUrl}/api/clients/${row.id}`
              )
              .subscribe(
                () => {
                  this.getClients();
                },
                (error) => {
                  // Gestion des erreurs lors de la suppression
                }
              );
          },
        },
      ],
    });

    await alert.present();
  }

  editer(row: any) {
    // Naviguer vers la page de formulaire d'édition avec les paramètres appropriés
    /* this.router.navigate(['/formulaire-Client-panne/'+ row.id ]); */

    this.router.navigate(['/formulaire-Client-panne', row.id]);
  }

  getClients() {
   
        this.http
          .get<any[]>(this.productService.apiUrl + '/api/clients', {})
          .subscribe((data) => {
            console.log('this.http.get');
            console.log(data); // data received by server
            this.Clients = data;
          });

  }


  // TODO[Dmitry Teplov] wrap dynamic limit in a separate component.
  public onLimitChange(limit: any): void {
    this.changePageLimit(limit.target.value);
    this.table.limit = this.currentPageLimit;
    this.table.recalculate();
    setTimeout(() => {
      console.log('444');
      if (this.table.bodyComponent.temp.length <= 0) {
        // TODO[Dmitry Teplov] find a better way.
        // TODO[Dmitry Teplov] test with server-side paging.
        if (this.table && this.table.limit != null) {
          this.table.offset = Math.floor(
            (this.table.rowCount - 1) / this.table.limit
          );
        }
        // this.table.offset = 0;
      }
    });
  }
}
