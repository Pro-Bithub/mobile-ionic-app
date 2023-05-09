import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from '../product/product.service';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule,HttpClientModule]
})
export class RegisterPagePage implements OnInit {
  registerForm: FormGroup;

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private productService: ProductService,
    private toastCtrl: ToastController
  ) {
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
  ngOnInit() {
  }
  async onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const  { nom, prenom, telephone, adresse, username, password , confirmPassword} = this.registerForm.value;   
  

     if (password !== confirmPassword) {
      const toast = await this.toastCtrl.create({
        message: 'Les mots de passe ne correspondent pas',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
      return;
    }
    const User = {
      nom, prenom,telephone, adresse, username, password
     }
    
    try {
      // Send a request to the server to verify the credentials
  const response = await this.http.post<any>(this.productService.apiUrl + '/api/clients',User).toPromise();
 
  if (response) {
    const toast = await this.toastCtrl.create({
      message: 'Compte créé avec succès',
      duration: 2000,
      color: 'success'
    });
    await toast.present();

        // Logique d'inscription à implémenter ici
    // Vous pouvez accéder aux valeurs du formulaire via this.registerForm.value

    localStorage.setItem('username',  this.registerForm.value.username);
    localStorage.setItem('password',this.registerForm.value.password);
    localStorage.setItem('hasPrivilege', false.toString());
    
    this.navCtrl.navigateForward('/liste-signalements');
  } else {
    const toast = await this.toastCtrl.create({
      message: 'Erreur lors de la création du compte',
      duration: 2000,
      color: 'danger'
    });
    await toast.present();
  }


  } catch (error) {
    const toast = await this.toastCtrl.create({
      message: 'Erreur lors de la création du compte',
      duration: 2000,
      color: 'danger'
    });
    await toast.present();
    // Handle error here, e.g. show error message to user
  }






  
  }
}
