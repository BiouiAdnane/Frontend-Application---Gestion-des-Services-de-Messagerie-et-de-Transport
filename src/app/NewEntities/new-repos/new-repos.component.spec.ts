import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReposComponent } from './new-repos.component';

describe('NewReposComponent', () => {
  let component: NewReposComponent;
  let fixture: ComponentFixture<NewReposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewReposComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
