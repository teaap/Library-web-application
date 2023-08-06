import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocetnaCitalacComponent } from './pocetna-citalac.component';

describe('PocetnaCitalacComponent', () => {
  let component: PocetnaCitalacComponent;
  let fixture: ComponentFixture<PocetnaCitalacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PocetnaCitalacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PocetnaCitalacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
