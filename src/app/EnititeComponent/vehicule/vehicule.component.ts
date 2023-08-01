import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {map, Observable, of} from "rxjs";
import {Voiture} from "../Models/Voiture";
import {VoitureService} from "../../Services/voiture.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.css']
})
export class VehiculeComponent implements OnInit{
  getVehiculeFormGroup!:FormGroup;
  voitures!: Observable<Array<Voiture>>;
  errMessage!:String;


  ngOnInit(): void {
    this.handelListVehicules();
  }


  constructor(private voitureService :VoitureService, private fb : FormBuilder, private router:Router) {
  }

  handelListVehicules() {
    this.voitureService.listVehicules().subscribe({
      next: (data) => {
        this.voitures = of(data); // Convert the array to an Observable using `of` from 'rxjs'
      },
      error: (err) => {
        this.errMessage = "Error fetching vehicle data.";
      },
    });
  }


  handledDeleteVehicule(v: Voiture) {
   

  }

  handelUpdateArticle(v: Voiture) {
    this.router.navigateByUrl("/updateVehicule/"+v.code_Voiture)
  }
}
