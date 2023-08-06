import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaprednapretragaComponent } from './naprednapretraga.component';

describe('NaprednapretragaComponent', () => {
  let component: NaprednapretragaComponent;
  let fixture: ComponentFixture<NaprednapretragaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaprednapretragaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaprednapretragaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
