import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-connexion-client',
  templateUrl: './connexion-client.page.html',
  styleUrls: ['./connexion-client.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ConnexionClientPage implements OnInit {
  username: string="";
  password: string="";

  constructor(private navCtrl: NavController, private toastCtrl: ToastController) {}
  async  onSubmit(form:any) {
    if (form.valid) {
      // Vérifier les informations d'identification ici
      if (this.username === "admin" && this.password === "admin") {
            // Sauvegarder le nom d'utilisateur et le mot de passe dans le localStorage
      localStorage.setItem('username', this.username);
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
    }
  }
  ngOnInit() {
  }
  onRegister(): void {
  

    // Use the navigate method to redirect to the registration page
   this.navCtrl.navigateForward('/register'); 
  }
}
