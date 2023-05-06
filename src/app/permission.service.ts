import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
    private hasPrivilege: boolean;

    constructor() {
      // Récupérer la valeur de hasPrivilege depuis le localStorage lors de l'initialisation du service
      this.hasPrivilege = this.checkPrivilege();
    }
  
    public checkPrivilege(): boolean {
      // Récupérer la valeur de hasPrivilege depuis le localStorage
      const privilege = localStorage.getItem('hasPrivilege');
      
      // Vérifier si la valeur existe et est "true"
      return privilege === 'true';
    }
  
    public hasPermission(): boolean {
      // Retourner la valeur de hasPrivilege
      return this.hasPrivilege;
    }
    public disconnect(): void {
      // Clear the localStorage values
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      localStorage.removeItem('hasPrivilege');
  
      // Reload the page to reflect the changes
      location.reload();
    }

}