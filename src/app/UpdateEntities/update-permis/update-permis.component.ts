import {Component, OnInit} from '@angular/core';
import {Conducteur} from "../../EnititeComponent/Models/Conducteur";
import {Permis} from "../../EnititeComponent/Models/Permis";
import {ActivatedRoute, Router} from "@angular/router";
import {ConducteurService} from "../../Services/conducteur.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {PermisService} from "../../Services/permis.service";

@Component({
  selector: 'app-update-permis',
  templateUrl: './update-permis.component.html',
  styleUrls: ['./update-permis.component.css']
})
export class UpdatePermisComponent implements OnInit{

  numPermis!:string;
  conducteur!:Conducteur;
  permis!: Permis;
  updatePermisFormGroup!: FormGroup;
  form: FormGroup = this.fb.group({})
  selectedType!: string;


  constructor(private route:ActivatedRoute,private router:Router, public conducteurService : ConducteurService
    , private fb : FormBuilder, private permisService : PermisService) {
    this.permis=this.router.getCurrentNavigation()?.extras.state as Permis;
    this.updatePermisFormGroup=new FormGroup({
      num_Permis:new FormControl(),
      date_Delivrance:new FormControl(),
      date_Fin:new FormControl(),
      lieu_Delivrance:new FormControl(),
      typePermisList:new FormControl(),
    })


  }

  ngOnInit(): void {
    this.numPermis=this.route.snapshot.params['num_Permis'];
    this.permisService.getPermis(this.numPermis).subscribe({
      next:(permis)=>{
        this.permis=permis;
        this.updatePermisFormGroup=this.fb.group({
          num_Permis:this.fb.control(this.permis.num_Permis),
          date_Delivrance:this.fb.control(this.permis.date_Delivrance),
          date_Fin:this.fb.control(this.permis.date_Fin),
          lieu_Delivrance:this.fb.control(this.permis.lieu_Delivrance),
          typePermisList:this.fb.control(this.permis.typePermisList),
        })
      },
      error : (err)=> {
        console.log(err);
      }
    })


    this.conducteurService.getConducteurByPermis(this.numPermis).subscribe({
      next:(conducteur)=>{
        this.conducteur=conducteur;
      },
      error : (err)=> {
        console.log(err);
      }
    })
  }

  handelUpdatePermis(){
    let p= this.updatePermisFormGroup.value;
    p.numPermis=this.permis.num_Permis;
    this.permisService.savePermis(p).subscribe({
      next : (data)=>{
        alert("La modification est faite avec succée");
        this.router.navigateByUrl("/visualiserConducteur/"+this.conducteur.cin)
      },
      error:err => {
        console.log(err);
      }
    })
  }

}
