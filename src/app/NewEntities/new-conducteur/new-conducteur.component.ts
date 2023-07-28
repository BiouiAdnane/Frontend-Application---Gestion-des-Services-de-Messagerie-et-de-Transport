import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConducteurService} from "../../Services/conducteur.service";
import {Conducteur} from "../../EnititeComponent/Models/Conducteur";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-conducteur',
  templateUrl: './new-conducteur.component.html',
  styleUrls: ['./new-conducteur.component.css']
})
export class NewConducteurComponent implements OnInit{

  newConducteurFormGroup!:FormGroup;


  constructor(private fb: FormBuilder,private router:Router, private conducteurService: ConducteurService) {
  }


  ngOnInit(): void {
    this.newConducteurFormGroup=this.fb.group({
      cin:this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      matricule:this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      nom:this.fb.control(null, [Validators.required, Validators.email]),
      prenom:this.fb.control(null),
      adresse:this.fb.control(null),
      date_Naissance:this.fb.control(null, [Validators.required]),
      numTel:this.fb.control(null),
      num_Permis:this.fb.control(null),
      date_Delivrance:this.fb.control(null),
      date_Fin:this.fb.control(null),
      lieu_Delivrance:this.fb.control(null),
      typePermisList: this.fb.array([]),
    });
    this.initializeTypePermisList([]);
  }
  initializeTypePermisList(typePermis: string[]): void {
    const formArray = this.newConducteurFormGroup.get('typePermisList') as FormArray;
    typePermis.forEach((type) => {
      formArray.push(this.fb.control(type));
    });
  }


  handleSaveConducteur(){
    if (this.newConducteurFormGroup.invalid) {
      alert("Veuillez remplir correctement tous les champs du formulaire.");
      return;
    }

    const data: Conducteur = this.newConducteurFormGroup.value;
    data.permis.typePermisList = this.newConducteurFormGroup.get('typePermisList')!.value;

    this.conducteurService.saveConducteur(data).subscribe({
      next:(data)=>{
        let cond =data
        alert("L'enregistrement est fait par succés");
        this.router.navigateByUrl("/Conducteurs")

      }, error:(err)=>{
        console.log(err)
      }
    })


  }
}
