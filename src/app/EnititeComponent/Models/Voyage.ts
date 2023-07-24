import {Conducteur} from "./Conducteur";
import {Voiture} from "./Voiture";

export interface Voyage {
  codeVoyage:number;
  ville_Depart:string;
  ville_Arrive:string;
  date_Debut:Date;
  date_Fin:Date;
  nombre_Voyageur:number;
  type_Voyage:TypeVoyage;
  conducteur:Conducteur;
  voiture:Voiture;
}
enum TypeVoyage {
  Transport_Marchandise="Transport_Marchandise",
  Transport_Personne="Transport_Personne",
  Transport_Livraison="Transport_Livraison",
  Autre="Autre"
}
