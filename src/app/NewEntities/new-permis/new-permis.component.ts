import {Component, Input} from '@angular/core';
import {Permis} from "../../EnititeComponent/Models/Permis";

@Component({
  selector: 'app-new-permis',
  templateUrl: './new-permis.component.html',
  styleUrls: ['./new-permis.component.css']
})
export class NewPermisComponent {
  @Input() permis!: Permis;
}
