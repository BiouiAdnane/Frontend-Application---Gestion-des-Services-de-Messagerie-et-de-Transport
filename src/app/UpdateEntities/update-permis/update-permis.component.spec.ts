import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePermisComponent } from './update-permis.component';

describe('UpdatePermisComponent', () => {
  let component: UpdatePermisComponent;
  let fixture: ComponentFixture<UpdatePermisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePermisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePermisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
