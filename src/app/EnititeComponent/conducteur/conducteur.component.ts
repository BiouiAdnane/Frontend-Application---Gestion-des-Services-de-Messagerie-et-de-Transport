import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {catchError, Observable, throwError} from "rxjs";
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
    let kw=this.searchConducteurFormGroup?.value.keyword;
    this.conducteur=this.conducteurService.searchConducteur(kw).pipe(
      catchError(err=>{
        this.errMessage=err.message;
        return throwError(err);

      })
    )

  }

  handelVoyageConducteur(c: Conducteur) {

  }

  handelUpdateConducteur(c: Conducteur) {

  }

  handledDeleteConducteur(c: Conducteur) {

  }
}
