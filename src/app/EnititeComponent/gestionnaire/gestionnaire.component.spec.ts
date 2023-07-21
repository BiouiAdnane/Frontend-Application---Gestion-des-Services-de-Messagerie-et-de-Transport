import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionnaireComponent } from './gestionnaire.component';

describe('GestionnaireComponent', () => {
  let component: GestionnaireComponent;
  let fixture: ComponentFixture<GestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionnaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
