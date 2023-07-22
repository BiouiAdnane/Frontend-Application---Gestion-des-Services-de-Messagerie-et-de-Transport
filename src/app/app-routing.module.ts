import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConducteurComponent} from "./EnititeComponent/conducteur/conducteur.component";

const routes: Routes = [
  {path :"Conducteurs", component: ConducteurComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
