import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConducteurService} from "../../Services/conducteur.service";

@Component({
  selector: 'app-new-conducteur',
  templateUrl: './new-conducteur.component.html',
  styleUrls: ['./new-conducteur.component.css']
})
export class NewConducteurComponent implements OnInit{

  newConducteurFormGroup!:FormGroup;


  constructor(private fb: FormBuilder, private conducteurService: ConducteurService) {
  }


  ngOnInit(): void {
    this.newConducteurFormGroup=this.fb.group({
      cin:this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      matricule:this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      nom:this.fb.control(null, [Validators.required, Validators.email]),
      prenom:this.fb.control(null),
      adresse:this.fb.control(null),
      date_Naissance:this.fb.control(null, [Validators.required]),
      num_Permis:this.fb.control(null),
      date_Delivrance:this.fb.control(null),
      date_Fin:this.fb.control(null),
      lieu_Delivrance:this.fb.control(null),
    })
  }

  handleSaveConducteur(){
    if (this.newPersonneFormGroup.invalid) {
      alert("Veuillez remplir correctement tous les champs du formulaire.");
      return;
    }

    let data: Utilisateur=this.newPersonneFormGroup.value;
    this.utilisateurService.savePersonne(data).subscribe({
      next:(data)=>{
        alert("L'enregistrement est fait par succés");
        this.newPersonneFormGroup.reset();

      }, error:(err)=>{
        console.log(err)
      }
    })


  }
}
