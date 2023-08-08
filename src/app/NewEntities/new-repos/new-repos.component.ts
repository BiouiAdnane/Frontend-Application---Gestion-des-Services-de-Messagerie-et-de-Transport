import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReposService} from "../../Services/repos.service";
import {Repos} from "../../EnititeComponent/Models/Repos";
import {Router} from "@angular/router";
import {ConducteurService} from "../../Services/conducteur.service";
import {Conducteur} from "../../EnititeComponent/Models/Conducteur";

@Component({
  selector: 'app-new-repos',
  templateUrl: './new-repos.component.html',
  styleUrls: ['./new-repos.component.css']
})
export class NewReposComponent implements OnInit {

  newReposFormGroup!: FormGroup;
  conducteurs: Conducteur[] = [];
  selectedConducteur: Conducteur | null = null;

  constructor(
    private fb: FormBuilder,
    private reposService: ReposService,
    private router: Router,
    private conducteurService: ConducteurService
  ) { }

  ngOnInit(): void {
    this.newReposFormGroup = this.fb.group({
      code_Repos: 0,
      date_Debut: ['', Validators.required],
      date_Fin: ['', Validators.required],
      conducteur: ['', Validators.required],
    });

    this.handelGetListConducteurs();
  }


  someOtherMethod(): void {
    if (this.selectedConducteur) {
      console.log("Selected Conductor Information:", this.selectedConducteur);
    } else {
      console.log("No conductor selected.");
    }
  }


  handleSaveRepos() {
    if (this.newReposFormGroup.invalid) {
      alert("Veuillez remplir correctement tous les champs du formulaire.");
      return;
    }

    const selectedCin = this.newReposFormGroup.get('conducteur')?.value;
    this.selectedConducteur = this.conducteurs.find((c) => c.cin === selectedCin) || null;

    if (!this.selectedConducteur) {
      alert("Le conducteur sélectionné n'a pas été trouvé dans la liste des conducteurs.");
      return;
    }

    const data: Repos = {
      code_Repos: 0,
      date_Debut: this.newReposFormGroup.get('date_Debut')?.value,
      date_Fin: this.newReposFormGroup.get('date_Fin')?.value,
      conducteur: this.selectedConducteur,
    };

    this.reposService.saveRepos(data).subscribe({
      next: (data) => {
        alert("L'enregistrement est fait avec succès");
        this.router.navigateByUrl('/Repos');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  handelGetListConducteurs() {
    this.conducteurService.listConducteur().subscribe(
      (conducteurs) => {
        this.conducteurs = conducteurs;
      },
      (error) => {
        console.log(error);
      }
    );
  }


}
