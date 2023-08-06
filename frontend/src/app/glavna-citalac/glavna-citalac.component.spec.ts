import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlavnaCitalacComponent } from './glavna-citalac.component';

describe('GlavnaCitalacComponent', () => {
  let component: GlavnaCitalacComponent;
  let fixture: ComponentFixture<GlavnaCitalacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlavnaCitalacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlavnaCitalacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
