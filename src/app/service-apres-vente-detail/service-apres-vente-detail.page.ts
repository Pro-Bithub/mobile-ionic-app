import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from '../product/product.service';
@Component({
  selector: 'app-service-apres-vente-detail',
  templateUrl: './service-apres-vente-detail.page.html',
  styleUrls: ['./service-apres-vente-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule,HttpClientModule],providers: [
    // ...
    BarcodeScanner,
    // ...
  ]
})
export class ServiceApresVenteDetailPage implements OnInit {
  serviceForm: FormGroup;
  typesPanne: any[] = [
    { label: 'Probleme kit assembly', value: 'kitAssembly' },
    { label: 'Probleme calibrage', value: 'calibrage' },
    { label: 'Probleme kit massicot', value: 'kitMassicot' },
    { label: 'Probleme kit convert 300dpi', value: 'kitConvert' },
    { label: 'Problem firmware', value: 'firmware' },
    { label: 'Probleme système d exploitation', value: 'systemeExploitation' },
    { label: 'déblocage de kit Latch Assembly', value: 'deblocageKit' },
    { label: 'port usb ne marche pas', value: 'portUSB' },
    { label: 'probleme au niveau carte logique', value: 'carteLogique' },
    { label: 'Madrin foutue', value: 'madrin' },
    { label: 'reglage de bouton', value: 'reglageBouton' },
    { label: 'Probleme courroie', value: 'courroie' },
    { label: 'Tete foutue', value: 'tete' },
    { label: 'probleme carte jump', value: 'carteJump' },
    { label: 'nettoyage capteur ruban', value: 'nettoyageCapteur' }
  ];
  clients: any[]=[] ;

  constructor(private http: HttpClient,private alertController: AlertController,private productService: ProductService,private formBuilder: FormBuilder,private barcodeScanner: BarcodeScanner) {
    this.serviceForm = this.formBuilder.group({
      datePanne: ['', Validators.required],
      numSerie: ['', Validators.required],
      typePanne: ['', Validators.required],
      etatPanne: [false],
      nomProduit: ['', Validators.required],
      observations: [''],
      clientName: [''],
    });
  }
  async openAddClientDialog() {
    const alert = await this.alertController.create({
      header: 'Ajouter un nouveau client',
      inputs: [
        {
          name: 'nom',
          type: 'text',
          placeholder: 'Nom du client'
        },
        {
          name: 'prenom',
          type: 'text',
          placeholder: 'Prénom du client'
        },
        {
          name: 'telephone',
          type: 'tel',
          placeholder: 'Téléphone'
        },
        {
          name: 'adresse',
          type: 'text',
          placeholder: 'Adresse'
        },
        {
          name: 'username',
          type: 'text',
          placeholder: 'Nom d\'utilisateur'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Mot de passe'
        },
        {
          name: 'confirmPassword',
          type: 'password',
          placeholder: 'Confirmer le mot de passe'
        }
        // Ajoutez plus de champs d'entrée selon vos besoins
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Ajouter',
          handler: (data) => {
            // Manipulez les données saisies par l'utilisateur ici
             // Handle the user input data here
        const nouveauClient = {
          nom: data.nom,
          prenom: data.prenom,
          telephone: data.telephone,
          adresse: data.adresse,
          username: data.username,
          password: data.password
          // Add other properties as needed
        };

         
            // Ajoutez le nouveau client à la liste des clients
            this.clients.push(nouveauClient);
            this.AddClient(nouveauClient)
          }
        } 
      ]
    });
  
    await alert.present();
  }
  AddClient(nouveauClient:any){
    this.http.post<any[]>(this.productService.apiUrl+"/api/clients", nouveauClient)
    .subscribe(data => {
      this.getclients()
    })
  }
  addNewClient() {
    this.openAddClientDialog();
  }
    
  ngOnInit() {
    this.getclients()
  }

  getclients() {
    this.http.get<any[]>(this.productService.apiUrl+"/api/clients", {})
  .subscribe(data => {

    console.log("this.http.get");
    console.log(data); // data received by server
    this.clients=data
  })
  }

  submitForm() {
    console.log(this.serviceForm.value);
    // Envoyer les données du formulaire au backend ici...
  }
  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
        // Récupérez les données du code-barres numérisé
        if (barcodeData && barcodeData.text) {
          // Mettez à jour la valeur du champ de saisie avec le code-barres numérisé
          this.serviceForm.controls['numSerie'].setValue(barcodeData.text);
        }

     }).catch(err => {
         console.log('Error', err);
     });

   
  }
}
