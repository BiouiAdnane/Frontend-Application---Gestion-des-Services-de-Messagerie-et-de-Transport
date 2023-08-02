import {Component, OnInit} from '@angular/core';
import {Conducteur} from "../Models/Conducteur";
import {Permis} from "../Models/Permis";
import {ActivatedRoute, Router} from "@angular/router";
import {ConducteurService} from "../../Services/conducteur.service";
import {FormBuilder} from "@angular/forms";
import {Voiture} from "../Models/Voiture";
import {Carte_Grise} from "../Models/Carte_Grise";
import {Visite_Technique} from "../Models/Visite_Technique";
import {Vignette} from "../Models/Vignette";
import {Assurance} from "../Models/Assurance";
import {VoitureService} from "../../Services/voiture.service";

@Component({
  selector: 'app-visualiser-vehicule',
  templateUrl: './visualiser-vehicule.component.html',
  styleUrls: ['./visualiser-vehicule.component.css']
})
export class VisualiserVehiculeComponent implements OnInit{

  code_Voiture!:number;
  vehivule!:Voiture;
  carteGrise!: Carte_Grise;
  visiteTechnique!:Visite_Technique;
  vignette!:Vignette;
  assurance!:Assurance;


  constructor(private route:ActivatedRoute,private router:Router, public voitureService : VoitureService
    , private fb : FormBuilder) {
    this.vehivule=this.router.getCurrentNavigation()?.extras.state as Voiture;


  }

  ngOnInit(): void {
    this.code_Voiture=this.route.snapshot.params['code_Voiture'];
    this.voitureService.getVoiture(this.code_Voiture).subscribe({
      next:(voiture)=>{
        this.vehivule=voiture;
      },
      error : (err)=> {
        console.log(err);
      }
    })
  }
}
