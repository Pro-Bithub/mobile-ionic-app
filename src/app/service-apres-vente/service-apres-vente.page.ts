import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-service-apres-vente',
  templateUrl: './service-apres-vente.page.html',
  styleUrls: ['./service-apres-vente.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ServiceApresVentePage implements OnInit {
  username: string="";
  password: string="";

  constructor(private navCtrl: NavController, private toastCtrl: ToastController) {}
  async  onSubmit(form:any) {
    if (form.valid) {
      // Vérifier les informations d'identification ici
      if (this.username === "admin" && this.password === "admin") {
        localStorage.setItem('username', this.username);
        localStorage.setItem('password', this.password);
        localStorage.setItem('hasPrivilege', true.toString());

        this.navCtrl.navigateForward('liste-signalements')
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

}
