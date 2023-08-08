import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Conducteur} from "../../EnititeComponent/Models/Conducteur";
import {ReposService} from "../../Services/repos.service";
import {Router} from "@angular/router";
import {ConducteurService} from "../../Services/conducteur.service";
import {VoyageService} from "../../Services/voyage.service";
import {DispoConformeService} from "../../Services/dispo-conforme.service";
import {Observable} from "rxjs";
import {Voiture} from "../../EnititeComponent/Models/Voiture";

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

  constructor(private fb: FormBuilder, private voyageService: VoyageService, private router: Router, private dispoConformeService: DispoConformeService,
  ) { }

  ngOnInit(): void {
    this.newVoayageFormGroup = this.fb.group({
      code_codeVoyage: 0,
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
  handleSaveVoyage() {

  }

}
