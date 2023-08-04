import {Component, OnInit} from '@angular/core';
import {Assurance} from "../../EnititeComponent/Models/Assurance";
import {Carte_Grise} from "../../EnititeComponent/Models/Carte_Grise";
import {Vignette} from "../../EnititeComponent/Models/Vignette";
import {Visite_Technique} from "../../EnititeComponent/Models/Visite_Technique";
import {Voiture} from "../../EnititeComponent/Models/Voiture";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {VoitureService} from "../../Services/voiture.service";

@Component({
  selector: 'app-update-vehicule',
  templateUrl: './update-vehicule.component.html',
  styleUrls: ['./update-vehicule.component.css']
})
export class UpdateVehiculeComponent implements OnInit {
  updateVehiculeFormGroup!: FormGroup;
  vehicule!: Voiture;

  constructor(
    private route:ActivatedRoute,private router:Router,
    private formBuilder: FormBuilder,
    private vehiculeService: VoitureService
  ) { }

  ngOnInit(): void {
    this.updateVehiculeFormGroup = this.formBuilder.group({
      ImmatCarteGrise: [''],
      typePermisVoiture: [''],
      MarqueCarteGrise: [''],
      ModelCarteGrise: [''],
      NbPlaceCarteGrise: [''],
      ProprietaireCarteGrise: [''],
      CarburantCarteGrise: [''],
      DateDebutCarteGrise: [''],
      DateFinCarteGrise: [''],
      CodeVignette: [''],
      DateDebutVignette: [''],
      DateFinVignette: [''],
      CodeAssurance: [''],
      TypeAssurance: [''],
      dateDebutAssurance: [''],
      dateFinAssurance: [''],
      CodeVisite: [''],
      EtatVoiture: [''],
      DateDebutVisite: [''],
      DateFinVisite: ['']
    });

    // Obtenez le véhicule à partir du service (remplacez "idDuVehicule" par l'ID du véhicule que vous souhaitez modifier)
    const idDuVehicule = this.route.snapshot.params['code_Voiture'];
    this.vehiculeService.getVoiture(idDuVehicule).subscribe(
      (vehicule: Voiture) => {
        this.vehicule = vehicule;
        this.updateVehiculeFormGroup.patchValue({
          ImmatCarteGrise: vehicule.carteGrise.num_Immatricualtion,
          typePermisVoiture: vehicule.typePermisVoiture,
          MarqueCarteGrise: vehicule.carteGrise.marque,
          ModelCarteGrise: vehicule.carteGrise.model,
          NbPlaceCarteGrise: vehicule.carteGrise.nombre_Place,
          ProprietaireCarteGrise: vehicule.carteGrise.nom_Proprietaire,
          CarburantCarteGrise: vehicule.carteGrise.typeCarburant,
          DateDebutCarteGrise: vehicule.carteGrise.date_Debut,
          DateFinCarteGrise: vehicule.carteGrise.date_Fin,
          CodeVignette: vehicule.vignette.code_Vignette,
          DateDebutVignette: vehicule.vignette.date_Debut,
          DateFinVignette: vehicule.vignette.date_Fin,
          CodeAssurance: vehicule.assurance.code_Assurance,
          TypeAssurance: vehicule.assurance.type_Assurance,
          dateDebutAssurance: vehicule.assurance.date_Debut,
          dateFinAssurance: vehicule.assurance.date_Fin,
          CodeVisite: vehicule.visiteTechnique.code_VisTech,
          EtatVoiture: vehicule.visiteTechnique.etat_Voiture,
          DateDebutVisite: vehicule.visiteTechnique.date_debut,
          DateFinVisite: vehicule.visiteTechnique.date_Fin
        });
      },
      error => {
        console.error('Erreur lors de la récupération du véhicule : ', error);
      }
    );
  }

  handleUpdateVehicule(): void {
    // Récupérez les valeurs modifiées du formulaire
    const formData = this.updateVehiculeFormGroup.value;

    // Mettez à jour les données du véhicule avec les nouvelles valeurs
    this.vehicule.carteGrise.num_Immatricualtion = formData.ImmatCarteGrise;
    this.vehicule.typePermisVoiture = formData.typePermisVoiture;
    this.vehicule.carteGrise.marque = formData.MarqueCarteGrise;
    this.vehicule.carteGrise.model = formData.ModelCarteGrise;
    this.vehicule.carteGrise.nombre_Place = formData.NbPlaceCarteGrise;
    this.vehicule.carteGrise.nom_Proprietaire = formData.ProprietaireCarteGrise;
    this.vehicule.carteGrise.typeCarburant = formData.CarburantCarteGrise;
    this.vehicule.carteGrise.date_Debut = formData.DateDebutCarteGrise;
    this.vehicule.carteGrise.date_Fin = formData.DateFinCarteGrise;
    this.vehicule.vignette.code_Vignette = formData.CodeVignette;
    this.vehicule.vignette.date_Debut = formData.DateDebutVignette;
    this.vehicule.vignette.date_Fin = formData.DateFinVignette;
    this.vehicule.assurance.code_Assurance = formData.CodeAssurance;
    this.vehicule.assurance.type_Assurance = formData.TypeAssurance;
    this.vehicule.assurance.date_Debut = formData.dateDebutAssurance;
    this.vehicule.assurance.date_Fin = formData.dateFinAssurance;
    this.vehicule.visiteTechnique.code_VisTech = formData.CodeVisite;
    this.vehicule.visiteTechnique.etat_Voiture = formData.EtatVoiture;
    this.vehicule.visiteTechnique.date_debut = formData.DateDebutVisite;
    this.vehicule.visiteTechnique.date_Fin = formData.DateFinVisite;

    // Enregistrez les modifications via le service
    this.vehiculeService.saveVehicule(this.vehicule).subscribe(
      () => {
        alert("La modification est faite avec succée");
        this.router.navigateByUrl("/Vehicules")
      },
      error => {
        console.error('Erreur lors de la mise à jour du véhicule : ', error);
      }
    );
  }
}
