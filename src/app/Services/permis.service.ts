import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Conducteur} from "../EnititeComponent/Models/Conducteur";
import {Permis} from "../EnititeComponent/Models/Permis";

@Injectable({
  providedIn: 'root'
})
export class PermisService {

  backendHost :String="http://localhost:8080"
  constructor(private http:HttpClient) { }

  public listPermis():Observable<Array<Permis>>{
    return this.http.get<Array<Permis>>(this.backendHost+"/permis")
  }

  public savePermis(permis : Permis){
    return this.http.post(this.backendHost + "/permis" ,permis)
  }

  public getPermis(num_Permis : string):Observable<Permis>{
    return this.http.get<Permis>(this.backendHost+"/permis/"+ num_Permis)
  }

}
