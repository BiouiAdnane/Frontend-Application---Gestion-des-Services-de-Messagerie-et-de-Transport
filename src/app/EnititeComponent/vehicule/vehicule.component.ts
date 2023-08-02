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
        this.voitures = of(data);
      },
      error: (err) => {
        this.errMessage = "Error fetching vehicule data.";
      },
    });
  }


  handledDeleteVehicule(v: Voiture) {
    let conf = confirm("Voulez-vous supprimer ce véhicule ?");
    if (!conf) return;
    this.voitureService.deleteVehicule(v.code_Voiture).subscribe({
      next: (data) => {
        this.voitures = this.voitures.pipe(
          map((dataArr) => {
            let index = dataArr.findIndex((item) => item.code_Voiture === v.code_Voiture);
            if (index > -1) {
              dataArr.splice(index, 1);
            }
            return dataArr;
          })
        );
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  handelUpdateVehicule(v: Voiture) {
    this.router.navigateByUrl("/updateVehicule/"+v.code_Voiture)
  }
  handelVisualiserVehicule(v: Voiture) {
    this.router.navigateByUrl("/visualiserVehicule/"+v.code_Voiture)
  }
}
