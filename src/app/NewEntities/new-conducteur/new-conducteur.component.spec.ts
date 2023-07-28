import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConducteurComponent } from './new-conducteur.component';

describe('NewConducteurComponent', () => {
  let component: NewConducteurComponent;
  let fixture: ComponentFixture<NewConducteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewConducteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewConducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
