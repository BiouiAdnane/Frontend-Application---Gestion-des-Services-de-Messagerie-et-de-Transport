import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {VoitureService} from "../../Services/voiture.service";
import {Voiture} from "../../EnititeComponent/Models/Voiture";

@Component({
  selector: 'app-new-vehicule',
  templateUrl: './new-vehicule.component.html',
  styleUrls: ['./new-vehicule.component.css']
})
export class NewVehiculeComponent implements OnInit{

  newVehiculeFormGroup!: FormGroup;
  voiture!:Voiture;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private vehiculeService: VoitureService
  ) {

  }
  ngOnInit(): void {
    this.newVehiculeFormGroup = this.formBuilder.group({
      code_Voiture:[0],
      ImmatCarteGrise: [''],
      typePermisVoiture: [''],
      MarqueCarteGrise: [''],
      ModelCarteGrise: [''],
      NbPlaceCarteGrise: [''],
      ProprietaireCarteGrise: [''],
      CarburantCarteGrise: [''],
      DateDebutCarteGrise: [''],
      DateFinCarteGrise: [''],
      CodeVignette: [0],
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



  }

  handleSaveVehicule(): void {
    const formData = this.newVehiculeFormGroup.value;

    // Create a new instance of Vehicule
    const newVehicule = this.voiture;

    // Update the properties of the Vehicule instance with the form data
    newVehicule.carteGrise.num_Immatricualtion = formData.ImmatCarteGrise;
    newVehicule.typePermisVoiture = formData.typePermisVoiture;
    newVehicule.carteGrise.marque = formData.MarqueCarteGrise;
    newVehicule.carteGrise.model = formData.ModelCarteGrise;
    newVehicule.carteGrise.nombre_Place = formData.NbPlaceCarteGrise;
    newVehicule.carteGrise.nom_Proprietaire = formData.ProprietaireCarteGrise;
    newVehicule.carteGrise.typeCarburant = formData.CarburantCarteGrise;
    newVehicule.carteGrise.date_Debut = formData.DateDebutCarteGrise;
    newVehicule.carteGrise.date_Fin = formData.DateFinCarteGrise;
    newVehicule.vignette.code_Vignette = formData.CodeVignette;
    newVehicule.vignette.date_Debut = formData.DateDebutVignette;
    newVehicule.vignette.date_Fin = formData.DateFinVignette;
    newVehicule.assurance.code_Assurance = formData.CodeAssurance;
    newVehicule.assurance.type_Assurance = formData.TypeAssurance;
    newVehicule.assurance.date_Debut = formData.dateDebutAssurance;
    newVehicule.assurance.date_Fin = formData.dateFinAssurance;
    newVehicule.visiteTechnique.code_VisTech = formData.CodeVisite;
    newVehicule.visiteTechnique.etat_Voiture = formData.EtatVoiture;
    newVehicule.visiteTechnique.date_debut = formData.DateDebutVisite;
    newVehicule.visiteTechnique.date_Fin = formData.DateFinVisite;

    // Save the newVehicule via the service
    this.vehiculeService.saveVehicule(newVehicule).subscribe(
      () => {
        alert("L'enregistrement est fait avec succès");
        this.router.navigateByUrl("/Vehicules");
      },
      error => {
        console.error('Erreur lors de l enregistrement du véhicule : ', error);
      }
    );
  }


}
