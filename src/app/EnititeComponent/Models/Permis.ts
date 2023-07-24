import {Conducteur} from "./Conducteur";

export interface Permis {
  num_Permis :string;
  date_Delivrance: Date;
  date_Fin: Date;
  lieu_Delivrance: string;
  typePermisList:string[];


}
