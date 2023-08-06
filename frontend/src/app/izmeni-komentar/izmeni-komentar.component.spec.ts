import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmeniKomentarComponent } from './izmeni-komentar.component';

describe('IzmeniKomentarComponent', () => {
  let component: IzmeniKomentarComponent;
  let fixture: ComponentFixture<IzmeniKomentarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzmeniKomentarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmeniKomentarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
