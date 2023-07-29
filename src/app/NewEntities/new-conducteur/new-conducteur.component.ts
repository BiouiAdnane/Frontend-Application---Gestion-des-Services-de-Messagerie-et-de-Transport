import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ConducteurService} from "../../Services/conducteur.service";
import {Conducteur} from "../../EnititeComponent/Models/Conducteur";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-conducteur',
  templateUrl: './new-conducteur.component.html',
  styleUrls: ['./new-conducteur.component.css']
})
export class NewConducteurComponent implements OnInit {
  newConducteurFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private conducteurService: ConducteurService
  ) {}

  ngOnInit(): void {
    this.newConducteurFormGroup = this.fb.group({
      cin: [null, [Validators.required, Validators.minLength(3)]],
      matricule: [null, [Validators.required, Validators.minLength(3)]],
      nom: [null, [Validators.required]],
      prenom: [null],
      adresse: [null],
      date_Naissance: [null, [Validators.required]],
      numTel: [null],
      num_Permis: [null],
      date_Delivrance: [null],
      date_Fin: [null],
      lieu_Delivrance: [null],
      typePermisList:['B','D'],
    });


  }

  handleSaveConducteur() {
    if (this.newConducteurFormGroup.invalid) {
      alert('Veuillez remplir correctement tous les champs du formulaire.');
      return;
    }

    const data: Conducteur = this.newConducteurFormGroup.value;
    this.conducteurService.saveConducteur(data).subscribe({
      next: (data) => {
        let cond = data;
        alert("L'enregistrement est fait par succès");
        this.router.navigateByUrl('/Conducteurs');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
