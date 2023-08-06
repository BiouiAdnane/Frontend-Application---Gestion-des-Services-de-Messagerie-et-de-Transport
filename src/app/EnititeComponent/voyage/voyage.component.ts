import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {catchError, map, Observable, tap, throwError} from "rxjs";
import {Conducteur} from "../Models/Conducteur";
import {ConducteurService} from "../../Services/conducteur.service";
import {Router} from "@angular/router";
import {Voyage} from "../Models/Voyage";
import {VoyageService} from "../../Services/voyage.service";
import {Voiture} from "../Models/Voiture";

@Component({
  selector: 'app-voyage',
  templateUrl: './voyage.component.html',
  styleUrls: ['./voyage.component.css']
})
export class VoyageComponent implements OnInit{

  searchVoyageFormGroup!:FormGroup;
  voyages!: Observable<Array<Voyage>>;
  errMessage!:String;

  ngOnInit(): void {
    this.searchVoyageFormGroup=this.fb.group({
      keyword:this.fb.control("")
    });
    this.handelSearchVoyage()
  }

  constructor(private voyageService :VoyageService, private fb : FormBuilder, private router:Router) {
  }
  handelSearchVoyage() {
    let kw = this.searchVoyageFormGroup?.value.keyword;
    this.voyages = this.voyageService.searchVoyage(kw).pipe(
      tap(data => console.log('Données reçues dans le composant :', data)),
      catchError(err => {
        this.errMessage = err.message;
        return throwError(err);
      })
    );
  }

  /*

  handledDeleteConducteur(c: Conducteur) {
    let conf=confirm("Voulez vous supprimer ce conducteur ?")
    if (!conf) return;
    this.conducteurService.deleteConducteur(c.cin).subscribe({
      next:(data)=>{
        this.conducteur=this.conducteur.pipe(
          map(data=>{
            let index=data.indexOf(c);
            data.slice(index, 1);
            return data;
          })
        )
      }, error:err => {
        console.log(err)       }
    })


  }*/

  handledVisualiserConducteur(c: Conducteur) {
    this.router.navigateByUrl("/visualiserConducteur/"+c.cin)
  }

  handledVisualiserVehicule(voiture: Voiture) {
    this.router.navigateByUrl("/visualiserVehicule/"+voiture.code_Voiture)
  }
}
