import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { PermissionService } from './permission.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class AppComponent {
  menuType: string = 'overlay';

  constructor(public permissionService: PermissionService,private router: Router) {

  }
  goToPage(page: string) {
    this.router.navigate([page]);
  }
  disconnect() {
     
    this.  permissionService.disconnect();
    this.  goToPage('categorie')
  }


}
