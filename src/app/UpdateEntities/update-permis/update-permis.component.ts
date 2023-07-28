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
  selectedType: string[] = [];
  validPermitTypes: string[] = ['AM', 'A1', 'A', 'B', 'C', 'D', 'EB', 'EC', 'ED'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public conducteurService: ConducteurService,
    private fb: FormBuilder,
    private permisService: PermisService
  ) {
    this.permis = this.router.getCurrentNavigation()?.extras.state as Permis;
    this.updatePermisFormGroup = new FormGroup({
      num_Permis: new FormControl(),
      date_Delivrance: new FormControl(),
      date_Fin: new FormControl(),
      lieu_Delivrance: new FormControl(),
      // No need to provide formControl for typePermisList
    });
  }

  ngOnInit(): void {
    this.numPermis = this.route.snapshot.params['num_Permis'];
    this.permisService.getPermis(this.numPermis).subscribe({
      next: (permis: Permis) => {
        this.permis = permis;
        this.selectedType = this.permis.typePermisList;
        this.updatePermisFormGroup = this.fb.group({
          num_Permis: this.fb.control(this.permis.num_Permis),
          date_Delivrance: this.fb.control(this.permis.date_Delivrance),
          date_Fin: this.fb.control(this.permis.date_Fin),
          lieu_Delivrance: this.fb.control(this.permis.lieu_Delivrance),
          // No need to provide formControl for typePermisList
        });

        // Loop through the permit types and add form controls dynamically
        this.validPermitTypes.forEach((permitType) => {
          this.updatePermisFormGroup.addControl(permitType, this.fb.control(this.selectedType.includes(permitType)));
        });

        this.updatePermisFormGroup.get('typePermisList')?.valueChanges.subscribe((selectedType: string[]) => {
          this.selectedType = selectedType;
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

  // Function to get the form control for a specific permit type
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


  isPermitTypeChecked(permitType: string): boolean {
    return this.selectedType.includes(permitType);
  }

  handelUpdatePermis() {
    // Update the 'typePermisList' property of the 'permis' object with selected permit types
    const excludeKeys = ['num_Permis', 'date_Delivrance', 'date_Fin', 'lieu_Delivrance'];
    this.permis.typePermisList = Object.keys(this.updatePermisFormGroup.value)
      .filter((key) => this.updatePermisFormGroup.controls[key].value && !excludeKeys.includes(key))
      .map((key) => key);


    // Save the updated 'permis' object
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
