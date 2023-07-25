import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateConducteurComponent } from './update-conducteur.component';

describe('UpdateConducteurComponent', () => {
  let component: UpdateConducteurComponent;
  let fixture: ComponentFixture<UpdateConducteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateConducteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateConducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
