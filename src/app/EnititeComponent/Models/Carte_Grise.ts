export interface Carte_Grise {
  num_Immatricualtion:string;
  date_Debut: Date;
  date_Fin:Date;
  nom_Proprietaire:string;
  nombre_Place:number;
  marque:string;
  model:string;
  typeCarburant:TypeCarburant;

}
enum TypeCarburant {
  Diesel="Diesel",
  Essence="Essence",
  GPL="GPL",
  GNC="GNC",
  Electricité="Electricité",
  Autre="Autre"
}
