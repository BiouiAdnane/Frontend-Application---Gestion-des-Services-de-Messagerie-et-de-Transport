import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConducteurComponent} from "./EnititeComponent/conducteur/conducteur.component";
import {PermisComponent} from "./EnititeComponent/permis/permis.component";
import {NewPermisComponent} from "./NewEntities/new-permis/new-permis.component";

const routes: Routes = [
  {path :"Conducteurs", component: ConducteurComponent},


  {path:"Permis", component: PermisComponent},
  {path:"NewPermis", component: NewPermisComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
