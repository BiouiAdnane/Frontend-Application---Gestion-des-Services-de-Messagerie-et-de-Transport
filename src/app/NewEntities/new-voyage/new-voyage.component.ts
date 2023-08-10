import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Conducteur} from "../../EnititeComponent/Models/Conducteur";
import {Router} from "@angular/router";
import {VoyageService} from "../../Services/voyage.service";
import {DispoConformeService} from "../../Services/dispo-conforme.service";
import {Voiture} from "../../EnititeComponent/Models/Voiture";
import {TypeVoyage, Voyage} from "../../EnititeComponent/Models/Voyage";
import {ConducteurService} from "../../Services/conducteur.service";
import {VoitureService} from "../../Services/voiture.service";

@Component({
  selector: 'app-new-voyage',
  templateUrl: './new-voyage.component.html',
  styleUrls: ['./new-voyage.component.css']
})
export class NewVoyageComponent implements OnInit{

  newVoayageFormGroup!: FormGroup;
  afficherInformations: boolean = false;
  typePermisSelected!:string;
  dateDebutSelected!:Date;
  dateFinSelected!:Date;
  ListConducteur!:Array<Conducteur>;
  ListVehicule!:Array<Voiture>;
  SelectedConducteur: Conducteur | null = null;
  conducteurs: Conducteur[] = [];
  SelectedVoiture:Voiture| null =null;
  voitures: Voiture[] = [];

  TypeVoyageSelected!:TypeVoyage;

  constructor(private fb: FormBuilder, private voyageService: VoyageService, private router: Router,private vehiculeService: VoitureService,
              private dispoConformeService: DispoConformeService,private conducteurService: ConducteurService
  ) { }

  ngOnInit(): void {
    this.newVoayageFormGroup = this.fb.group({
      codeVoyage: 0,
      ville_Depart: ['', Validators.required],
      ville_Arrive: ['', Validators.required],
      date_Debut: ['', Validators.required],
      date_Fin: ['', Validators.required],
      nombre_Voyageur: ['', Validators.required],
      typePermis:['',Validators.required],
      type_Voyage: ['', Validators.required],
      conducteur: ['', Validators.required],
      voiture: ['', Validators.required],
    });

    this.newVoayageFormGroup.get('typePermis')!.valueChanges.subscribe(value => {
      this.typePermisSelected = value;
      this.ConducteursDispoConforme();
      this.VehiculesDispoConforme();
    });

    this.newVoayageFormGroup.get('date_Debut')!.valueChanges.subscribe(value => {
      this.dateDebutSelected = value;
      this.ConducteursDispoConforme();
      this.VehiculesDispoConforme();
    });

    this.newVoayageFormGroup.get('date_Fin')!.valueChanges.subscribe(value => {
      this.dateFinSelected = value;
      this.ConducteursDispoConforme();
      this.VehiculesDispoConforme();
    });

    this.newVoayageFormGroup.get('type_Voyage')!.valueChanges.subscribe(value => {
      this.TypeVoyageSelected = value;
    });

    this.handelGetListConducteurs();
    this.handelGetListVehicule();
  }

  ConducteursDispoConforme() {
    if (this.typePermisSelected && this.dateDebutSelected && this.dateFinSelected) {
      this.dispoConformeService.ConducteursDispoConforme(this.typePermisSelected, this.dateDebutSelected, this.dateFinSelected)
        .subscribe(value => {
          this.ListConducteur = value;
        });
    }
  }
  VehiculesDispoConforme() {
    if (this.typePermisSelected && this.dateDebutSelected && this.dateFinSelected) {
      this.dispoConformeService.VehiculesDispoConforme(this.typePermisSelected, this.dateDebutSelected, this.dateFinSelected)
        .subscribe(value => {
          this.ListVehicule = value;
        });
    }
  }

  handelGetListConducteurs() {
    this.conducteurService.listConducteur().subscribe(
      (conducteurs) => {
        this.conducteurs = conducteurs;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handelGetListVehicule(){
    this.vehiculeService.listVehicules().subscribe(
      (voitures) => {
        this.voitures = voitures;
        console.log(voitures)
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleSaveVoyage() {
    if (this.newVoayageFormGroup.invalid) {
      alert("Veuillez remplir correctement tous les champs du formulaire.");
      return;
    }
    const selectedCin = this.newVoayageFormGroup.get('conducteur')?.value;
    this.SelectedConducteur = this.conducteurs.find((c) => c.cin === selectedCin) || null;

    if (!this.SelectedConducteur) {
      alert("Le conducteur sélectionné n'a pas été trouvé dans la liste des conducteurs.");
      return;
    }
    const selectedCodeVoiture = this.newVoayageFormGroup.get('voiture')?.value;
    this.SelectedVoiture = this.voitures.find((v) => v.code_Voiture == selectedCodeVoiture) || null;

    if (!this.SelectedVoiture) {
      alert("Le véhicule sélectionné n'a pas été trouvé dans la liste des véhicules.");
      return;
    }


    const data: Voyage = {
      codeVoyage: 0,
      ville_Depart: this.newVoayageFormGroup.get('ville_Depart')?.value,
      ville_Arrive: this.newVoayageFormGroup.get('ville_Arrive')?.value,
      date_Debut: this.newVoayageFormGroup.get('date_Debut')?.value,
      date_Fin: this.newVoayageFormGroup.get('date_Fin')?.value,
      nombre_Voyageur: this.newVoayageFormGroup.get('nombre_Voyageur')?.value,
      type_Voyage: this.newVoayageFormGroup.get('type_Voyage')?.value,
      conducteur: this.SelectedConducteur,
      voiture: this.SelectedVoiture,
    };

    this.voyageService.saveVoyage(data).subscribe({
      next: (data) => {
        alert("L'enregistrement est fait avec succès");
        this.router.navigateByUrl('/Voyages');
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

}
