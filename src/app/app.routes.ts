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
    path: 'formulaire-signalement-panne/:id',
    loadComponent: () => import('./service-apres-vente-detail/service-apres-vente-detail.page').then( m => m.ServiceApresVenteDetailPage)
  },
  {
    path: 'categories',
    loadComponent: () => import('./categories-page/categories-page.page').then( m => m.CategoriesPagePage)
  },
  {
    path: 'product',
    loadComponent: () => import('./product-page/product-page.page').then( m => m.ProductpagePage)
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
    path: 'liste-client',
    loadComponent: () => import('./liste-client/liste-client.page').then( m => m.ListeClientsPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register-page/register-page.page').then( m => m.RegisterPagePage)
  },
  {
    path: 'accueil',
    loadComponent: () => import('./accueil/accueil.page').then( m => m.AccueilPage)
  },
  {
    path: 'Statistique',
    loadComponent: () => import('./statistique/statistique.page').then( m => m.StatistiquePage)
  },

];
