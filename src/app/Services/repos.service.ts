import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Conducteur} from "../EnititeComponent/Models/Conducteur";
import {Repos} from "../EnititeComponent/Models/Repos";

@Injectable({
  providedIn: 'root'
})
export class ReposService {


  backendHost :String="http://localhost:8080"
  constructor(private http:HttpClient) { }

  public getListRepos():Observable<Array<Repos>>{
    return this.http.get<Array<Repos>>(this.backendHost+"/repos")
  }

  public getRepos(code_Repos : number):Observable<Repos>{
    return this.http.get<Repos>(this.backendHost+"/repos/"+ code_Repos)
  }


  public saveRepos(repos : Repos){
    return this.http.post(this.backendHost + "/repos" ,repos)
  }
  public deleteRepos(code_Repos : number){
    return this.http.delete(this.backendHost+"/repos/"+code_Repos)
  }
}
