import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {catchError, Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {Permis} from "../Models/Permis";
import {PermisService} from "../../Services/permis.service";

@Component({
  selector: 'app-permis',
  templateUrl: './permis.component.html',
  styleUrls: ['./permis.component.css']
})
export class PermisComponent implements OnInit{

  ListPermisFormGroup!:FormGroup;
  permis!: Observable<Array<Permis>>;
  errMessage!:String;

  ngOnInit(): void {

    this.handelListPermis()
  }

  constructor(private permisService :PermisService, private fb : FormBuilder, private router:Router) {
  }
  handelListPermis() {

    this.permis=this.permisService.listPermis().pipe(
      catchError(err=>{
        this.errMessage=err.message;
        return throwError(err);

      })
    )

  }

  handelVoyagePermis(p: Permis) {

  }

  handelUpdatePermis(p: Permis) {

  }

  handledDeletePermis(p: Permis) {

  }
}
