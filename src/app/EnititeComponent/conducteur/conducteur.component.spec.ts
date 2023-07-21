import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConducteurComponent } from './conducteur.component';

describe('ConducteurComponent', () => {
  let component: ConducteurComponent;
  let fixture: ComponentFixture<ConducteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConducteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
