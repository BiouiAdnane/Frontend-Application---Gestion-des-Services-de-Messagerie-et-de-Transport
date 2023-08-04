import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVehiculeComponent } from './new-vehicule.component';

describe('NewVehiculeComponent', () => {
  let component: NewVehiculeComponent;
  let fixture: ComponentFixture<NewVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewVehiculeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
