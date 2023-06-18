import { Component } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PermissionService } from './permission.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule],
})
export class AppComponent {
  menuType: string = 'overlay';

  constructor(private navCtrl: NavController,public permissionService: PermissionService,private router: Router) {

  }
  goToPage(page: string) {
    this.router.navigate([page]);
  }
 
  isLoggedAdminIn(): boolean {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    return !!(username === 'admin' && password === 'admin');
  }
  isLoggedIn(): boolean {
    const username = localStorage.getItem('username');
    return !!(username );
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('hasPrivilege');
    localStorage.removeItem('idclient');
   //  this.navCtrl.navigateForward('/liste-signalements');
    this.goToPage('categorie')
  }


}
