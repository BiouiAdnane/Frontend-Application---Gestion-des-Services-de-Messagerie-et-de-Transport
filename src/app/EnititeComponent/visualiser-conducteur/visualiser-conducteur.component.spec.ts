import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualiserConducteurComponent } from './visualiser-conducteur.component';

describe('VisualiserConducteurComponent', () => {
  let component: VisualiserConducteurComponent;
  let fixture: ComponentFixture<VisualiserConducteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualiserConducteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualiserConducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
