import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahteviModeratorComponent } from './zahtevi-moderator.component';

describe('ZahteviModeratorComponent', () => {
  let component: ZahteviModeratorComponent;
  let fixture: ComponentFixture<ZahteviModeratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZahteviModeratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZahteviModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
