import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {catchError, map, Observable, tap, throwError} from "rxjs";
import {Conducteur} from "../Models/Conducteur";
import {ConducteurService} from "../../Services/conducteur.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-conducteur',
  templateUrl: './conducteur.component.html',
  styleUrls: ['./conducteur.component.css']
})
export class ConducteurComponent implements OnInit{

  searchConducteurFormGroup!:FormGroup;
  conducteur!: Observable<Array<Conducteur>>;
  errMessage!:String;

  ngOnInit(): void {
    this.searchConducteurFormGroup=this.fb.group({
      keyword:this.fb.control("")
    });
    this.handelSearchConducteur()
  }

  constructor(private conducteurService :ConducteurService, private fb : FormBuilder, private router:Router) {
  }
  handelSearchConducteur() {
    let kw = this.searchConducteurFormGroup?.value.keyword;
    this.conducteur = this.conducteurService.searchConducteur(kw).pipe(
      tap(data => console.log('Données reçues dans le composant :', data)),
      catchError(err => {
        this.errMessage = err.message;
        return throwError(err);
      })
    );
  }


  handelVoyageConducteur(c: Conducteur) {

  }



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


  }

  handledVisualiserConducteur(c: Conducteur) {
    this.router.navigateByUrl("/visualiserConducteur/"+c.cin)
  }
}
