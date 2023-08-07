import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Conducteur} from "../EnititeComponent/Models/Conducteur";
import {HttpClient} from "@angular/common/http";
import {Voiture} from "../EnititeComponent/Models/Voiture";

@Injectable({
  providedIn: 'root'
})
export class DispoConformeService {

  backendHost :String="http://localhost:8080"
  constructor(private http:HttpClient) { }

  public ConducteursDispoConforme(typePermis : string, dateDebut: Date, dateFin:Date):Observable<Array<Conducteur>>{
    return this.http.get<Array<Conducteur>>(this.backendHost+"/dispoConforme/conducteurs/"+ typePermis +"/"+ dateDebut +"/"+ dateFin)
  }

  public VehiculesDispoConforme(typePermis : string, dateDebut: Date, dateFin:Date):Observable<Array<Voiture>>{
    return this.http.get<Array<Voiture>>(this.backendHost+"/dispoConforme/vehicules/"+ typePermis +"/"+ dateDebut +"/"+ dateFin)
  }
}
