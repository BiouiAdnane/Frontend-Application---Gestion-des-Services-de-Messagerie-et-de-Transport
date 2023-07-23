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

@NgModule({
  declarations: [
    AppComponent,
    ConducteurComponent,
    GestionnaireComponent,
    NavBarComponent,
    PermisComponent
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
