export interface Visite_Technique {
  code_VisTech:string;
  date_debut:Date;
  date_Fin:Date;
  etat_Voiture:EtatVT;

}
enum EtatVT {
  Conforme="Conforme",
  Non_Conforme="Non_Conforme"
}
