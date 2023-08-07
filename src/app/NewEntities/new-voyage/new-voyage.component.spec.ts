import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVoyageComponent } from './new-voyage.component';

describe('NewVoyageComponent', () => {
  let component: NewVoyageComponent;
  let fixture: ComponentFixture<NewVoyageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewVoyageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewVoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
