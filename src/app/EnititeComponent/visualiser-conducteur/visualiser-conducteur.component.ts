import {Component, Input, OnInit} from '@angular/core';
import {Conducteur} from "../Models/Conducteur";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ConducteurService} from "../../Services/conducteur.service";
import {Permis} from "../Models/Permis";

@Component({
  selector: 'app-visualiser-conducteur',
  templateUrl: './visualiser-conducteur.component.html',
  styleUrls: ['./visualiser-conducteur.component.css']
})
export class VisualiserConducteurComponent implements OnInit{

  cin!:string;
  conducteur!:Conducteur;
  permis!: Permis;


  constructor(private route:ActivatedRoute,private router:Router, public conducteurService : ConducteurService
    , private fb : FormBuilder) {
    this.conducteur=this.router.getCurrentNavigation()?.extras.state as Conducteur;


  }

  ngOnInit(): void {
    this.cin=this.route.snapshot.params['cin'];
    this.conducteurService.getConducteur(this.cin).subscribe({
      next:(conducteur)=>{
        this.conducteur=conducteur;
      },
      error : (err)=> {
        console.log(err);
      }
    })
  }

}
