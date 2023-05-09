import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public apiUrl = 'http://192.168.1.15:8080';
/*   private signalements: any[] = [
    { id: 1, datePanne: '2022-01-01', numSerie: 'ABC123', typePanne: 'Tête', repare: "OUI", nomProduit: 'Produit 1', observations: 'Observations du signalement 1' },
    { id: 2, datePanne: '2022-02-01', numSerie: 'DEF456', typePanne: 'Mandrin', repare: "NON", nomProduit: 'Produit 2', observations: 'Observations du signalement 2' },
    { id: 3, datePanne: '2022-03-01', numSerie: 'GHI789', typePanne: 'Autre', repare: "NON", nomProduit: 'Produit 3', observations: 'Observations du signalement 3' },
    { id: 1, datePanne: '2022-01-01', numSerie: 'ABC123', typePanne: 'Tête', repare: "OUI", nomProduit: 'Produit 1', observations: 'Observations du signalement 1' },
    { id: 2, datePanne: '2022-02-01', numSerie: 'DEF456', typePanne: 'Mandrin', repare: "NON", nomProduit: 'Produit 2', observations: 'Observations du signalement 2' },
    { id: 3, datePanne: '2022-03-01', numSerie: 'GHI789', typePanne: 'Autre', repare: "NON", nomProduit: 'Produit 3', observations: 'Observations du signalement 3' },
    { id: 1, datePanne: '2022-01-01', numSerie: 'ABC123', typePanne: 'Tête', repare: "OUI", nomProduit: 'Produit 1', observations: 'Observations du signalement 1' },
    { id: 2, datePanne: '2022-02-01', numSerie: 'DEF456', typePanne: 'Mandrin', repare: "NON", nomProduit: 'Produit 2', observations: 'Observations du signalement 2' },
    { id: 3, datePanne: '2022-03-01', numSerie: 'GHI789', typePanne: 'Autre', repare: "NON", nomProduit: 'Produit 3', observations: 'Observations du signalement 3' },
    { id: 1, datePanne: '2022-01-01', numSerie: 'ABC123', typePanne: 'Tête', repare: "OUI", nomProduit: 'Produit 1', observations: 'Observations du signalement 1' },
    { id: 2, datePanne: '2022-02-01', numSerie: 'DEF456', typePanne: 'Mandrin', repare: "NON", nomProduit: 'Produit 2', observations: 'Observations du signalement 2' },
    { id: 3, datePanne: '2022-03-01', numSerie: 'GHI789', typePanne: 'Autre', repare: "NON", nomProduit: 'Produit 3', observations: 'Observations du signalement 3' },
    { id: 1, datePanne: '2022-01-01', numSerie: 'ABC123', typePanne: 'Tête', repare: "OUI", nomProduit: 'Produit 1', observations: 'Observations du signalement 1' },
    { id: 2, datePanne: '2022-02-01', numSerie: 'DEF456', typePanne: 'Mandrin', repare: "NON", nomProduit: 'Produit 2', observations: 'Observations du signalement 2' },
    { id: 3, datePanne: '2022-03-01', numSerie: 'GHI789', typePanne: 'Autre', repare: "NON", nomProduit: 'Produit 3', observations: 'Observations du signalement 3' },
    // Ajoutez d'autres signalements au besoin
  ]; */


/*   Categorie: Observable<Product[]>;
  sousCategorie: Observable<Product[]>; */
  constructor(){
  /*   this.Categorie = of([
      new Product(1, 'Terminaux Mobiles ', 'terminaux_mobiles.png', 10),
      new Product(2, 'Imprimantes Thermiques ', 'Imprimantes_thermiques.png', 20),
      new Product(3, 'Scanners code à barre', 'scanners_code_a_barre.png', 30),
      new Product(4, 'Tablettes Durcies', 'tablettes_durcies.png', 40),
      new Product(5, 'Solution Badges', 'solution_badges.png', 50),
      new Product(6, 'Solution bracelets', 'solution_bracelets.png', 60),
      new Product(7, 'RFID', 'RFID.png', 70),
      new Product(8, 'Kiosques interactifs', 'kiosques_interactifs.png', 80),
      new Product(9, 'Consommables code à barre : Etiquettes et rubans', 'etiquettes_et_rubans.png', 90),
      new Product(10, 'Accessoires', 'accessoires.png', 100),
      new Product(11, 'Equipement Zebra fin de série', 'equipement_zebra_fin_de_serie.png', 110)
]); */
/* this.sousCategorie = of([
  new Product(1, 'Terminaux tactiles avec clavier', 'terminaux_tactiles_avec_clavie.png', 1),
  new Product(2, 'Terminaux tactiles  ', 'terminaux_tactiles.png', 1),
  new Product(3, 'Wearables', 'wearables.png', 1),
  new Product(4, 'Logiciels', 'logiciels.png', 1),
  new Product(5, 'Imprimantes thermiques Industrielles ', 'imprimantes_thermiques_Industrielles.png', 2),
  new Product(6, 'Imprimantes thermiques de bureau', 'imprimantes_thermiques_de_bureau.png', 2),
  new Product(7, 'Imprimantes thermiques mobiles', 'imprimantes_thermiques_mobiles.png', 2),
  new Product(8, 'Scanners code barre sans fil', 'scanners_code_barre_sans_fil.png', 3),
  new Product(9, 'Scanners code barre filaires', 'scanners_code_barre_filaires.png', 3),
  new Product(10, 'Scanners code barre de comptoir', 'scanners_code_barre_de_comptoir.png', 3),
  new Product(11, 'Logiciels', 'logiciels.png', 3),
  new Product(11, 'Tablettes windows', 'tablettes_windows.png', 4),
  new Product(11, 'Tablettes Android', 'tablettes_android.png', 4),
  new Product(11, 'Imprimantes à badges', 'imprimantes_a_badges.png', 5),
  new Product(11, 'Consommables ', 'Consommables.png', 5),
  new Product(11, 'Logiciels', 'Logiciels.png', 5),
  new Product(11, 'Z-Band Wristbands', 'z_Band_Wristbands.png', 6),
  new Product(11, 'Imprimante de bracelets Zebra ZD510-HC', 'imprimante_de_bracelets_Zebra_ZD510-HC.png', 6),
  new Product(11, 'Imprimantes RFID', 'imprimantes_RFID.png', 7),
  new Product(11, 'Lecteurs fixes RFID', 'lecteurs_fixes_RFID.png', 7),
  new Product(11, 'Terminaux RFID', 'terminaux_RFID.png', 7),
  new Product(11, 'Antennes', 'antennes.png', 7),
  new Product(11, 'Consommables RFID ', 'consommables_RFID.png', 7),
  new Product(11, 'kiosque interactif CC600 Zebra', 'kiosque_interactif_CC600_Zebra.png', 8),
  new Product(11, 'kiosque interactif CC6000 Zebra', 'kiosqueinteractif CC6000 Zebra.png', 8),
  new Product(11, 'Rubans Transfert Thermique', 'rubans_Transfert_Thermique.png', 9),
  new Product(11, 'Etiquettes Autocollantes ', 'Etiquettes_autocollantes .png', 9),
  new Product(11, 'Accessoires pour imprimantes ', 'accessoires_pour_imprimantes.png',10),
  new Product(11, 'Accessoires pour les scanners', 'Accessoires_pour_les_scanners.png',10),
  new Product(11, 'Accessoires pour Les Termineaux Mobile', 'Accessoires_pour_Les_Termineaux Mobile.png', 10),
  new Product(11, 'Imprimantes Zebra fin de série', 'Imprimantes_Zebra_fin_de_série.png', 11),
  new Product(11, 'Terminaux Zebra discontinuées', 'Terminaux_Zebra_discontinuées.png', 11),
  
  
  
]); */
  }
/*   getProducts(): Observable<any> {
    
    return this.Categorie;
  } */
/*   getsousCategories(idcat: number): Observable<any> {
    return this.sousCategorie.pipe(
      map((products: Product[]) => {
        return products.filter((product: Product) => product.idcat === idcat);
      })
    );
  }
  getAll(): Observable<any[]> {
    return of(this.signalements);
  } */

}
 