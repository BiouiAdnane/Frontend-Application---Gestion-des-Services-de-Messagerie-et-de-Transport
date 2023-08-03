import {Component, OnInit} from '@angular/core';
import {Assurance} from "../../EnititeComponent/Models/Assurance";
import {Carte_Grise} from "../../EnititeComponent/Models/Carte_Grise";
import {Vignette} from "../../EnititeComponent/Models/Vignette";
import {Visite_Technique} from "../../EnititeComponent/Models/Visite_Technique";
import {Voiture} from "../../EnititeComponent/Models/Voiture";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {VoitureService} from "../../Services/voiture.service";

@Component({
  selector: 'app-update-vehicule',
  templateUrl: './update-vehicule.component.html',
  styleUrls: ['./update-vehicule.component.css']
})
export class UpdateVehiculeComponent implements OnInit{

  code_Voiture!:number;
  assurance!:Assurance;
  carteGrise!:Carte_Grise;
  vignette!:Vignette;
  visiteTechnique!:Visite_Technique;
  voiture!:Voiture;

  updateVehiculeFormGroup!: FormGroup;
  form: FormGroup = this.fb.group({})

  constructor(private route:ActivatedRoute,private router:Router, public voitureService : VoitureService, private fb : FormBuilder) {
    this.voiture=this.router.getCurrentNavigation()?.extras.state as Voiture;
    this.updateVehiculeFormGroup=new FormGroup({
      code_Voiture:new FormControl(this.code_Voiture),
      typePermisVoiture:new FormControl(),

      CodeAssurance:new FormControl(),
      TypeAssurance:new FormControl(),
      dateDebutAssurance:new FormControl(),
      dateFinAssurance:new FormControl(),

      ImmatCarteGrise:new FormControl(),
      MarqueCarteGrise:new FormControl(),
      ModelCarteGrise:new FormControl(),
      NbPlaceCarteGrise:new FormControl(),
      CarburantCarteGrise:new FormControl(),
      ProprietaireCarteGrise:new FormControl(),
      DateDebutCarteGrise:new FormControl(),
      DateFinCarteGrise:new FormControl(),

      CodeVignette:new FormControl(),
      DateDebutVignette:new FormControl(),
      DateFinVignette:new FormControl(),

      CodeVisite:new FormControl(),
      EtatVoiture:new FormControl(),
      DateDebutVisite:new FormControl(),
      DateFinVisite:new FormControl(),
    })

  }

  ngOnInit(): void {
    this.code_Voiture=this.route.snapshot.params['code_Voiture'];
    this.voitureService.getVoiture(this.code_Voiture).subscribe({
      next:(voiture)=>{
        this.voiture=voiture;
        this.updateVehiculeFormGroup=this.fb.group({
          code_Voiture:this.fb.control(this.code_Voiture),
          typePermisVoiture:this.fb.control(this.voiture.typePermisVoiture),

          CodeAssurance:this.fb.control(this.voiture.assurance.code_Assurance),
          TypeAssurance:this.fb.control(this.voiture.assurance.type_Assurance),
          dateDebutAssurance:this.fb.control(this.voiture.assurance.date_Debut),
          dateFinAssurance: this.fb.control(this.voiture.assurance.date_Fin),

          ImmatCarteGrise:this.fb.control(this.voiture.carteGrise.num_Immatricualtion),
          MarqueCarteGrise:this.fb.control(this.voiture.carteGrise.marque),
          ModelCarteGrise:this.fb.control(this.voiture.carteGrise.model),
          NbPlaceCarteGrise: this.fb.control(this.voiture.carteGrise.nombre_Place),
          CarburantCarteGrise:this.fb.control(this.voiture.carteGrise.typeCarburant),
          ProprietaireCarteGrise:this.fb.control(this.voiture.carteGrise.nom_Proprietaire),
          DateDebutCarteGrise:this.fb.control(this.voiture.carteGrise.date_Debut),
          DateFinCarteGrise:this.fb.control(this.voiture.carteGrise.date_Fin),

          CodeVignette:this.fb.control(this.voiture.vignette.code_Vignette),
          DateDebutVignette:this.fb.control(this.voiture.vignette.date_Debut),
          DateFinVignette: this.fb.control(this.voiture.vignette.date_Fin),

          CodeVisite:this.fb.control(this.voiture.visiteTechnique.code_VisTech),
          EtatVoiture:this.fb.control(this.voiture.visiteTechnique.etat_Voiture),
          DateDebutVisite:this.fb.control(this.voiture.visiteTechnique.date_debut),
          DateFinVisite: this.fb.control(this.voiture.visiteTechnique.date_Fin),

        })
      },
      error : (err)=> {
        console.log(err);
      }
    })
  }

  handleUpdateVehicule() {
    let v= this.updateVehiculeFormGroup.value;
    v.voiture.code_Voiture=this.voiture.code_Voiture;
    this.voitureService.saveVehicule(v).subscribe({
      next : (data)=>{
        alert("La modification est faite avec succée");
        this.router.navigateByUrl("/visualiserVehicule/"+this.code_Voiture)
      },
      error:err => {
        console.log(err);
      }
    })
  }
}
