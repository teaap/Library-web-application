import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocetnaModeratorComponent } from './pocetna-moderator.component';

describe('PocetnaModeratorComponent', () => {
  let component: PocetnaModeratorComponent;
  let fixture: ComponentFixture<PocetnaModeratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PocetnaModeratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PocetnaModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
