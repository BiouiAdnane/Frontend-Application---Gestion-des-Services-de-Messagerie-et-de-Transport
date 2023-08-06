import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Voiture} from "../EnititeComponent/Models/Voiture";
import {Voyage} from "../EnititeComponent/Models/Voyage";
import {Conducteur} from "../EnititeComponent/Models/Conducteur";

@Injectable({
  providedIn: 'root'
})
export class VoyageService {

  backendHost :String="http://localhost:8080"
  constructor(private http:HttpClient) { }

  public searchVoyage(keyword : String):Observable<Array<Voyage>>{
    return this.http.get<Array<Voyage>>(this.backendHost+"/voyages/search?keyword="+keyword)
  }

  public getVoyage(codeVoyage : number):Observable<Voyage>{
    return this.http.get<Voyage>(this.backendHost+"/voyages/"+ codeVoyage)
  }

  public saveVoyage(voyage : Voyage){
    return this.http.post(this.backendHost + "/voyages" ,voyage)
  }
  public deleteVoyage(codeVoyage : number){
    return this.http.delete(this.backendHost+"/voyages/"+codeVoyage)
  }
}
