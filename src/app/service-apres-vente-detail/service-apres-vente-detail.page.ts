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
 

  constructor(    private route: ActivatedRoute,
    private toastCtrl: ToastController,private navCtrl: NavController,private http: HttpClient,private alertController: AlertController,private productService: ProductService,private formBuilder: FormBuilder,private barcodeScanner: BarcodeScanner) {
    this.serviceForm = this.formBuilder.group({
      datePanne: ['', Validators.required],
      numSerie: ['', Validators.required],
      typePanne: ['', Validators.required],
      repare: [false],
      nomProduit: ['', Validators.required],
      observations: [''],
      idclient: [''],
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
    console.log("ngOnInit")
    const id = this.route.snapshot.paramMap.get('id');
  console.log(id); // Output the value of the 'id' parameter
if(id!="0"){
 this.loadDataToEdit(id)
}


    this.getclients()
  }

  selectedTypePanne: string[] = ['kitAssembly', 'calibrage']; // Example values



  loadDataToEdit(rowId: any) {
    // Effectuer une requête pour récupérer les données de la ligne à éditer à partir de l'ID
    this.http.get<any>(`${this.productService.apiUrl}/api/signalements/${rowId}`).subscribe(data => {
      // Pré-remplir le formulaire avec les données récupérées
      this.serviceForm.patchValue({
        datePanne: data[0].datePanne,
        numSerie: data[0].numSerie,
        typePanne: data[0].typePanne,
        repare: data[0].repare,
        nomProduit: data[0].nomProduit,
        observations: data[0].observations,
        idclient: data[0].idclient,
      });

  // Divisez la chaîne de caractères en utilisant la virgule comme séparateur pour obtenir un tableau de valeurs
  const preselectedValues = data[0].typePanne.split(',').map((value: string) => value.trim());

  // Parcourez les valeurs pré-sélectionnées de `typePanne`
  for (const value of preselectedValues) {
    // Recherchez l'option correspondante dans `typesPanne` en utilisant la valeur
    const selectedOption = this.typesPanne.find(type => type.value === value);
    
    // Si une option correspondante est trouvée, ajoutez-la à `selectedTypePanne`
    if (selectedOption) {
      this.selectedTypePanne.push(selectedOption);
    }
  }
  console.log(" this.selectedTypePanne")
console.log( this.selectedTypePanne)
      // Set the selected types

      // Set the selected value for repare
      let repareValue ="encours" ;
      if(data[0]?.repare==1)
      repareValue="oui"
      else
      repareValue="non"
      this.serviceForm.get('repare')?.setValue(repareValue);
     
    });
  }

  getclients() {
    this.http.get<any[]>(this.productService.apiUrl+"/api/clients", {})
  .subscribe(data => {

    console.log("this.http.get");
    console.log(data); // data received by server
    this.clients=data
  })
  }

  async submitForm() {
    console.log(this.serviceForm.value);
    let typePannes = ""
    let { datePanne, numSerie, typePanne, repare, nomProduit, observations, idclient } = this.serviceForm.value;
    if(typePanne)
     typePannes = this.serviceForm.value.typePanne.join(", "); // convert array to string
     const Signalements = {
      datePanne, numSerie,typePanne: typePannes, repare, nomProduit, observations, idclient
     }

     
     try {
      // Send a request to the server to verify the credentials
  const response = await this.http.post<any>(this.productService.apiUrl + '/api/signalements',Signalements).toPromise();
 
  if (response) {
    const toast = await this.toastCtrl.create({
      message: 'Signalement créé avec succès',
      duration: 2000,
      color: 'success'
    });
    await toast.present();
    this.navCtrl.navigateForward('/liste-signalements');
  } else {
    const toast = await this.toastCtrl.create({
      message: 'Erreur lors de la création du signalement',
      duration: 2000,
      color: 'danger'
    });
    await toast.present();
  }


  } catch (error) {
   const toast = await this.toastCtrl.create({
    message: 'Erreur lors de la création du signalement',
    duration: 2000,
    color: 'danger'
  });
  await toast.present();
    // Handle error here, e.g. show error message to user
  }



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
