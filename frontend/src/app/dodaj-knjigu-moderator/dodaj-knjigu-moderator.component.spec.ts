import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajKnjiguModeratorComponent } from './dodaj-knjigu-moderator.component';

describe('DodajKnjiguModeratorComponent', () => {
  let component: DodajKnjiguModeratorComponent;
  let fixture: ComponentFixture<DodajKnjiguModeratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodajKnjiguModeratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajKnjiguModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
