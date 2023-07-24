import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPermisComponent } from './new-permis.component';

describe('NewPermisComponent', () => {
  let component: NewPermisComponent;
  let fixture: ComponentFixture<NewPermisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPermisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPermisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
