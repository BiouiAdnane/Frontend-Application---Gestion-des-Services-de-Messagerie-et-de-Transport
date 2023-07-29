import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ConducteurService} from "../../Services/conducteur.service";
import {Conducteur} from "../../EnititeComponent/Models/Conducteur";
import {Router} from "@angular/router";
import {Permis} from "../../EnititeComponent/Models/Permis";

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
      // Change typePermisList to a FormArray
      typePermisList: this.fb.array([]),
    });
  }

  // Convenience getter to access the FormArray
  get typePermisListArray() {
    return this.newConducteurFormGroup.get('typePermisList') as FormArray;
  }

  handleSaveConducteur() {
    if (this.newConducteurFormGroup.invalid) {
      alert('Veuillez remplir correctement tous les champs du formulaire.');
      return;
    }

    const selectedCategories = this.newConducteurFormGroup.get('typePermisList')?.value;
    const permis: Permis = {
      num_Permis: this.newConducteurFormGroup.get('num_Permis')?.value,
      date_Delivrance: this.newConducteurFormGroup.get('date_Delivrance')?.value,
      date_Fin: this.newConducteurFormGroup.get('date_Fin')?.value,
      lieu_Delivrance: this.newConducteurFormGroup.get('lieu_Delivrance')?.value,
      typePermisList: selectedCategories,
    };

    const data: Conducteur = {
      cin: this.newConducteurFormGroup.get('cin')?.value,
      matricule: this.newConducteurFormGroup.get('matricule')?.value,
      nom: this.newConducteurFormGroup.get('nom')?.value,
      prenom: this.newConducteurFormGroup.get('prenom')?.value,
      adresse: this.newConducteurFormGroup.get('adresse')?.value,
      date_Naissance: this.newConducteurFormGroup.get('date_Naissance')?.value,
      numTel: this.newConducteurFormGroup.get('numTel')?.value,
      permis: permis,
      voyage: [],
      reposList: [],
    };

    this.conducteurService.saveConducteur(data).subscribe({
      next: (data) => {
        alert("L'enregistrement est fait avec succès");
        this.router.navigateByUrl('/Conducteurs');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
