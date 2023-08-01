import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConducteurComponent } from './EnititeComponent/conducteur/conducteur.component';
import { GestionnaireComponent } from './EnititeComponent/gestionnaire/gestionnaire.component';
import { NavBarComponent } from './EnititeComponent/nav-bar/nav-bar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { PermisComponent } from './EnititeComponent/permis/permis.component';
import { NewPermisComponent } from './NewEntities/new-permis/new-permis.component';
import { UpdatePermisComponent } from './UpdateEntities/update-permis/update-permis.component';
import { UpdateConducteurComponent } from './UpdateEntities/update-conducteur/update-conducteur.component';
import { VisualiserConducteurComponent } from './EnititeComponent/visualiser-conducteur/visualiser-conducteur.component';
import { NewConducteurComponent } from './NewEntities/new-conducteur/new-conducteur.component';
import { ReposComponent } from './EnititeComponent/repos/repos.component';
import { NewReposComponent } from './NewEntities/new-repos/new-repos.component';
import { VehiculeComponent } from './EnititeComponent/vehicule/vehicule.component';

@NgModule({
  declarations: [
    AppComponent,
    ConducteurComponent,
    GestionnaireComponent,
    NavBarComponent,
    PermisComponent,
    NewPermisComponent,
    UpdatePermisComponent,
    UpdateConducteurComponent,
    VisualiserConducteurComponent,
    NewConducteurComponent,
    ReposComponent,
    NewReposComponent,
    VehiculeComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule ,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
