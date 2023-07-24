import {Voiture} from "./Voiture";

export interface Parking {
  numParking:number;
  ville:string;
  adresse:string;
  nombreMax:number;
  nombreActuel:number;
  voiture:Voiture[];

}
