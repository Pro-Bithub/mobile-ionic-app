import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'categorie',
    pathMatch: 'full',
  },
  {
    path: 'categorie',
    loadComponent: () => import('./product/product.page').then( m => m.ProductPage)
  },
  {
    path: 'service-apres-vente',
    loadComponent: () => import('./service-apres-vente/service-apres-vente.page').then( m => m.ServiceApresVentePage)
  },
  {
    path: 'formulaire-signalement-panne',
    loadComponent: () => import('./service-apres-vente-detail/service-apres-vente-detail.page').then( m => m.ServiceApresVenteDetailPage)
  },
  {
    path: 'categories',
    loadComponent: () => import('./categories-page/categories-page.page').then( m => m.CategoriesPagePage)
  },
  {
    path: 'connexion-client',
    loadComponent: () => import('./connexion-client/connexion-client.page').then( m => m.ConnexionClientPage)
  },
  {
    path: 'liste-signalements',
    loadComponent: () => import('./liste-signalements/liste-signalements.page').then( m => m.ListeSignalementsPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register-page/register-page.page').then( m => m.RegisterPagePage)
  },
  {
    path: 'testcodebarre',
    loadComponent: () => import('./testcodebarre/testcodebarre.page').then( m => m.Testcodebarre)
  },

];
