import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConducteurComponent } from './EnititeComponent/conducteur/conducteur.component';
import { GestionnaireComponent } from './EnititeComponent/gestionnaire/gestionnaire.component';
import { NavBarComponent } from './EnititeComponent/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ConducteurComponent,
    GestionnaireComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
