import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Conducteur} from "../../EnititeComponent/Models/Conducteur";

@Component({
  selector: 'app-new-voyage',
  templateUrl: './new-voyage.component.html',
  styleUrls: ['./new-voyage.component.css']
})
export class NewVoyageComponent {
  newVoayageFormGroup!: FormGroup;
  conducteurs!:Conducteur;

  handleSaveVoyage() {

  }
}
