import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from '../product/product.service';
@Component({
  selector: 'app-connexion-client',
  templateUrl: './connexion-client.page.html',
  styleUrls: ['./connexion-client.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,HttpClientModule]
})
export class ConnexionClientPage implements OnInit {
  username: string="";
  password: string="";

  constructor(private http: HttpClient,private productService: ProductService,private navCtrl: NavController, private toastCtrl: ToastController) {}
  async  onSubmit(form:any) {
    if (form.valid) {
   
      try {
        // Send a request to the server to verify the credentials
    const response = await this.http.post<any>(this.productService.apiUrl + '/api/clients/login', {username: this.username, password: this.password}).toPromise();
   console.log("response")
   console.log(response.status)
   console.log(response)
   if (response.id) {
            // Sauvegarder le nom d'utilisateur et le mot de passe dans le localStorage
      localStorage.setItem('username', this.username);
      localStorage.setItem('idclient', response.id);
      localStorage.setItem('password', this.password);
      localStorage.setItem('hasPrivilege', false.toString());
         this.navCtrl.navigateForward('/liste-signalements');
      } else {
        const toast = await this.toastCtrl.create({
          message: 'Nom d\'utilisateur ou mot de passe incorrect',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      }

    } catch (error) {
      const toast = await this.toastCtrl.create({
        message: 'Nom d\'utilisateur ou mot de passe incorrect',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
      // Handle error here, e.g. show error message to user
    }

    }
  }
  ngOnInit() {
  }
  onRegister(): void {
  

    // Use the navigate method to redirect to the registration page
   this.navCtrl.navigateForward('/register'); 
  }
}
