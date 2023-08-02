import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualiserVehiculeComponent } from './visualiser-vehicule.component';

describe('VisualiserVehiculeComponent', () => {
  let component: VisualiserVehiculeComponent;
  let fixture: ComponentFixture<VisualiserVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualiserVehiculeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualiserVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
