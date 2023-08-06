import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlavnaAdministratorComponent } from './glavna-administrator.component';

describe('GlavnaAdministratorComponent', () => {
  let component: GlavnaAdministratorComponent;
  let fixture: ComponentFixture<GlavnaAdministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlavnaAdministratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlavnaAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
