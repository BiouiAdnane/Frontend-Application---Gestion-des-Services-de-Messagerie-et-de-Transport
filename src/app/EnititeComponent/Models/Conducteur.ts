import {Permis} from "./Permis";
import {Voyage} from "./Voyage";
import {Repos} from "./Repos";

export interface Conducteur {
  CIN: string;
  TYPE:string;
  Matricule :string;
  Nom: string;
  Prenom :string;
  Adresse : string;
  Date_Naissance :Date;
  NumTel: string;
  permis:Permis;
  voyage: Voyage[];
  reposList: Repos[];
}

