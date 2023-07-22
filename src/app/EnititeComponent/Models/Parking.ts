import {Voiture} from "./Voiture";

export interface Parking {
  NumParking:number;
  Ville:string;
  Adresse:string;
  NombreMax:number;
  NombreActuel:number;
  voiture:Voiture[];

}
