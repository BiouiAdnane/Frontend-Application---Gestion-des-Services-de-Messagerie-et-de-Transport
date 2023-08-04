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

    // Create a new instance of Voiture and its related objects
    const newVehicule: Voiture = {
      code_Voiture: formData.code_Voiture,
      typePermisVoiture: formData.typePermisVoiture,
      assurance: {
        code_Assurance: formData.CodeAssurance,
        type_Assurance: formData.TypeAssurance,
        date_Debut: formData.dateDebutAssurance,
        date_Fin: formData.dateFinAssurance,
      },
      visiteTechnique: {
        code_VisTech: formData.CodeVisite,
        date_debut: formData.DateDebutVisite,
        date_Fin: formData.DateFinVisite,
        etat_Voiture: formData.EtatVoiture,
      },
      vignette: {
        code_Vignette: formData.CodeVignette,
        date_Debut: formData.DateDebutVignette,
        date_Fin: formData.DateFinVignette,
      },
      carteGrise: {
        num_Immatricualtion: formData.ImmatCarteGrise,
        date_Debut: formData.DateDebutCarteGrise,
        date_Fin: formData.DateFinCarteGrise,
        nom_Proprietaire: formData.ProprietaireCarteGrise,
        nombre_Place: formData.NbPlaceCarteGrise,
        marque: formData.MarqueCarteGrise,
        model: formData.ModelCarteGrise,
        typeCarburant: formData.CarburantCarteGrise ,
      },
    };

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
