import {Component, OnInit} from '@angular/core';
import {Conducteur} from "../../EnititeComponent/Models/Conducteur";
import {Permis} from "../../EnititeComponent/Models/Permis";
import {ActivatedRoute, Router} from "@angular/router";
import {ConducteurService} from "../../Services/conducteur.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors} from "@angular/forms";
import {PermisService} from "../../Services/permis.service";

@Component({
  selector: 'app-update-permis',
  templateUrl: './update-permis.component.html',
  styleUrls: ['./update-permis.component.css']
})
export class UpdatePermisComponent implements OnInit {
  numPermis!: string;
  conducteur!: Conducteur;
  permis!: Permis;
  updatePermisFormGroup!: FormGroup;
  selectedCategories: string[] = [];
  validPermitTypes: string[] = ['AM', 'A1', 'A', 'B', 'C', 'D', 'EB', 'EC', 'ED'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public conducteurService: ConducteurService,
    private fb: FormBuilder,
    private permisService: PermisService
  ) {
    this.updatePermisFormGroup = this.fb.group({
      num_Permis: this.fb.control(''),
      date_Delivrance: this.fb.control(''),
      date_Fin: this.fb.control(''),
      lieu_Delivrance: this.fb.control(''),
    });

    this.validPermitTypes.forEach((permitType) => {
      this.updatePermisFormGroup.addControl(permitType, this.fb.control(false));
    });

    this.updatePermisFormGroup.get('typePermisList')?.valueChanges.subscribe((selectedType: string[]) => {
      this.selectedCategories = selectedType;
    });
  }

  ngOnInit(): void {
    this.numPermis = this.route.snapshot.params['num_Permis'];
    this.permisService.getPermis(this.numPermis).subscribe({
      next: (permis: Permis) => {
        this.permis = permis;
        this.selectedCategories = this.permis.typePermisList;

        this.updatePermisFormGroup.patchValue({
          num_Permis: this.permis.num_Permis,
          date_Delivrance: this.permis.date_Delivrance,
          date_Fin: this.permis.date_Fin,
          lieu_Delivrance: this.permis.lieu_Delivrance,
        });

        this.validPermitTypes.forEach((permitType) => {
          this.updatePermisFormGroup.controls[permitType].setValue(this.selectedCategories.includes(permitType));
        });
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.conducteurService.getConducteurByPermis(this.numPermis).subscribe({
      next: (conducteur: Conducteur) => {
        this.conducteur = conducteur;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getFormControl(permitType: string): FormControl {
    return this.updatePermisFormGroup.get(permitType) as FormControl;
  }

  private validatePermitType(control: AbstractControl): ValidationErrors | null {
    const selectedType: string[] = control.value;

    if (!selectedType.every((type) => this.validPermitTypes.includes(type))) {
      return { invalidPermitType: true };
    }

    return null;
  }

  isCategorySelected(category: string): boolean {
    return this.selectedCategories.includes(category);
  }

  toggleCategory(category: string): void {
    if (this.isCategorySelected(category)) {
      this.selectedCategories = this.selectedCategories.filter((cat) => cat !== category);
    } else {
      this.selectedCategories.push(category);
    }
  }

  handelUpdatePermis() {
    this.permis.typePermisList = this.selectedCategories;

    this.permis.date_Delivrance = this.updatePermisFormGroup.get('date_Delivrance')?.value;
    this.permis.date_Fin = this.updatePermisFormGroup.get('date_Fin')?.value;
    this.permis.lieu_Delivrance = this.updatePermisFormGroup.get('lieu_Delivrance')?.value;

    this.permisService.savePermis(this.permis).subscribe({
      next: (data) => {
        alert('La modification est faite avec succès');
        this.router.navigateByUrl('/visualiserConducteur/' + this.conducteur.cin);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
