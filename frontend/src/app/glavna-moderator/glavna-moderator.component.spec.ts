import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlavnaModeratorComponent } from './glavna-moderator.component';

describe('GlavnaModeratorComponent', () => {
  let component: GlavnaModeratorComponent;
  let fixture: ComponentFixture<GlavnaModeratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlavnaModeratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlavnaModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
