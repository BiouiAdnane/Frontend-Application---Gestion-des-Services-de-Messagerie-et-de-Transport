import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Conducteur} from "../EnititeComponent/Models/Conducteur";
import {Voiture} from "../EnititeComponent/Models/Voiture";

@Injectable({
  providedIn: 'root'
})
export class VoitureService {


  backendHost :String="http://localhost:8080"
  constructor(private http:HttpClient) { }

  public listVehicules():Observable<Array<Voiture>>{
    return this.http.get<Array<Voiture>>(this.backendHost+"/voitures")
  }

  public getVoiture(code_Voiture : number):Observable<Voiture>{
    return this.http.get<Voiture>(this.backendHost+"/voitures/"+ code_Voiture)
  }


  public saveVehicule(voiture : Voiture){
    return this.http.post(this.backendHost + "/voitures" ,voiture)
  }
  public deleteVehicule(code_Voiture : number){
    return this.http.delete(this.backendHost+"/voitures/"+code_Voiture)
  }


}
