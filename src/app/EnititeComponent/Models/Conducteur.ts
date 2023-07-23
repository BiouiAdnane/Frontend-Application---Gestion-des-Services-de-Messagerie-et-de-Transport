import {Permis} from "./Permis";
import {Voyage} from "./Voyage";
import {Repos} from "./Repos";

export interface Conducteur {
  cin: string;
  matricule :string;
  nom: string;
  prenom :string;
  adresse : string;
  date_Naissance :Date;
  numTel: string;
  permis:Permis;
  voyage: Voyage[];
  reposList: Repos[];
}

