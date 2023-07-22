import {Assurance} from "./Assurance";
import {Visite_Technique} from "./Visite_Technique";
import {Vignette} from "./Vignette";
import {Carte_Grise} from "./Carte_Grise";
import {Parking} from "./Parking";

export interface Voiture{
  code_Voiture:number;
  typePermisVoiture:string;
  assurance:Assurance;
  visiteTechnique:Visite_Technique;
  vignette:Vignette;
  carteGrise:Carte_Grise;
  parking:Parking;
}
