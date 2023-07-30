import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {catchError, map, Observable, tap, throwError} from "rxjs";
import {Conducteur} from "../Models/Conducteur";
import {ConducteurService} from "../../Services/conducteur.service";
import {Router} from "@angular/router";
import {Repos} from "../Models/Repos";
import {ReposService} from "../../Services/repos.service";

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class ReposComponent implements OnInit{

  searchReposFormGroup!:FormGroup;
  repos!: Observable<Array<Repos>>;
  errMessage!:String;

  ngOnInit(): void {

    this.handelgetRepos();
  }

  constructor(private reposService :ReposService, private fb : FormBuilder, private router:Router) {
  }
  handelgetRepos() {
    let kw = this.searchReposFormGroup?.value.keyword;
    this.repos = this.reposService.getListRepos();
  }





  handledDeleteRepos(r: Repos) {
    let conf=confirm("Voulez vous supprimer ce repos ?")
    if (!conf) return;
    this.reposService.deleteRepos(r.code_Repos).subscribe({
      next:(data)=>{
        this.repos=this.repos.pipe(
          map(data=>{
            let index=data.indexOf(r);
            data.slice(index, 1);
            return data;
          })
        )
      }, error:err => {
        console.log(err)       }
    })


  }
  handelNewRepos(){
    this.router.navigateByUrl('/newRepos')
  }

  handledVisualiserConducteur(c: Conducteur) {
    this.router.navigateByUrl("/visualiserConducteur/"+c.cin)
  }
}
