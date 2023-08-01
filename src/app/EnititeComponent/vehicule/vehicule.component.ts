import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {Voiture} from "../Models/Voiture";

@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.css']
})
export class VehiculeComponent implements OnInit{
  getVehiculeFormGroup!:FormGroup;
  vehicules!: Observable<Array<Voiture>>;
  errMessage!:String;


  ngOnInit(): void {
  }


  constructor(private voitureService :, private fb : FormBuilder, private router:Router) {
  }

  handelSearchArticle() {
    let kw=this.searchArticleFormGroup?.value.keyword;
    this.article=this.articleService.searchArticle(kw).pipe(
      catchError(err=>{
        this.errMessage=err.message;
        return throwError(err);

      })
    )

  }

  handledDeleteArticle(a: Article) {
    let conf=confirm("Voulez vous supprimer cet article ?")
    if (!conf) return;
    this.articleService.deleteArticle(a.code_Article).subscribe({
      next:(data)=>{
        this.article=this.article.pipe(
          map(data=>{
            let index=data.indexOf(a);
            data.slice(index, 1);
            return data;
          })
        )
      }, error:err => {
        console.log(err)       }
    })

  }

  handelUpdateArticle(a: Article) {
    this.router.navigateByUrl("/updateArticle/"+a.code_Article)
  }
}
