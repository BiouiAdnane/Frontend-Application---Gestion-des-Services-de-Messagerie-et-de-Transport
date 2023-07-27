import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConducteurComponent} from "./EnititeComponent/conducteur/conducteur.component";
import {PermisComponent} from "./EnititeComponent/permis/permis.component";
import {NewPermisComponent} from "./NewEntities/new-permis/new-permis.component";
import {UpdateConducteurComponent} from "./UpdateEntities/update-conducteur/update-conducteur.component";
import {VisualiserConducteurComponent} from "./EnititeComponent/visualiser-conducteur/visualiser-conducteur.component";
import {UpdatePermisComponent} from "./UpdateEntities/update-permis/update-permis.component";

const routes: Routes = [
  {path :"Conducteurs", component: ConducteurComponent},
  {path:"updateConducteur/:cin", component: UpdateConducteurComponent},
  {path:"visualiserConducteur/:cin",component: VisualiserConducteurComponent},


  {path:"Permis", component: PermisComponent},
  {path:"NewPermis", component: NewPermisComponent},
  {path:"updatePermis/:num_Permis", component: UpdatePermisComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
