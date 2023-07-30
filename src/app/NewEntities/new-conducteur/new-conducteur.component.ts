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
    private conducteurService: ConducteurService // Replace with the actual ConducteurService instance
  ) {}

  ngOnInit(): void {
    this.newConducteurFormGroup = this.fb.group({
      cin: [null],
      matricule: [null],
      nom: [null],
      prenom: [null],
      adresse: [null],
      date_Naissance: [null],
      numTel: [null],
      num_Permis: [null],
      date_Delivrance: [null],
      date_Fin: [null],
      lieu_Delivrance: [null],
      category_AM: [false],
      category_A1: [false],
      category_A: [false],
      category_B: [false],
      category_C: [false],
      category_D: [false],
      category_EB: [false],
      category_EC: [false],
      category_ED: [false],
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

    const selectedCategories: string[] = [];
    if (this.newConducteurFormGroup.get('category_AM')?.value) {
      selectedCategories.push('AM');
    }
    if (this.newConducteurFormGroup.get('category_A1')?.value) {
      selectedCategories.push('A1');
    }

    if (this.newConducteurFormGroup.get('category_A')?.value) {
      selectedCategories.push('A');
    }
    if (this.newConducteurFormGroup.get('category_B')?.value) {
      selectedCategories.push('B');
    }
    if (this.newConducteurFormGroup.get('category_C')?.value) {
      selectedCategories.push('C');
    }
    if (this.newConducteurFormGroup.get('category_D')?.value) {
      selectedCategories.push('D');
    }
    if (this.newConducteurFormGroup.get('category_EB')?.value) {
      selectedCategories.push('EB');
    }
    if (this.newConducteurFormGroup.get('category_EC')?.value) {
      selectedCategories.push('EC');
    }
    if (this.newConducteurFormGroup.get('category_ED')?.value) {
      selectedCategories.push('ED');
    }

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
