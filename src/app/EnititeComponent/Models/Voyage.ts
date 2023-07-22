import {Conducteur} from "./Conducteur";
import {Voiture} from "./Voiture";

export interface Voyage {
  CodeVoyage:number;
  Ville_Depart:string;
  Ville_Arrive:string;
  Date_Debut:Date;
  Date_Fin:Date;
  Nombre_Voyageur:number;
  Type_Voyage:TypeVoyage;
  conducteur:Conducteur;
  voiture:Voiture;
}
enum TypeVoyage {
  Transport_Marchandise="Transport_Marchandise",
  Transport_Personne="Transport_Personne",
  Transport_Livraison="Transport_Livraison",
  Autre="Autre"
}
