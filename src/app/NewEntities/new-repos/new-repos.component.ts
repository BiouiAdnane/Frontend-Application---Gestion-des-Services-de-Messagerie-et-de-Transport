import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReposService} from "../../Services/repos.service";
import {Repos} from "../../EnititeComponent/Models/Repos";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-repos',
  templateUrl: './new-repos.component.html',
  styleUrls: ['./new-repos.component.css']
})
export class NewReposComponent implements OnInit{

  newReposFormGroup!:FormGroup;

  constructor(private fb: FormBuilder, private reposService: ReposService, private router:Router) {
  }

  ngOnInit(): void {
    this.newReposFormGroup = this.fb.group({
      date_Debut: ['', Validators.required],
      date_Fin: ['', Validators.required],
      conducteur: ['', Validators.required],
    });
  }

  handleSaveRepos() {
    if (this.newReposFormGroup.invalid) {
      alert("Veuillez remplir correctement tous les champs du formulaire.");
      return;
    }

    let data: Repos=this.newReposFormGroup.value;
    this.reposService.saveRepos(data).subscribe({
      next:(data)=>{
        alert("L'enregistrement est fait avec succès");
        this.router.navigateByUrl('/Repos')
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

}
