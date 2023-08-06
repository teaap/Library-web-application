import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrenutnoZaduzeneComponent } from './trenutno-zaduzene.component';

describe('TrenutnoZaduzeneComponent', () => {
  let component: TrenutnoZaduzeneComponent;
  let fixture: ComponentFixture<TrenutnoZaduzeneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrenutnoZaduzeneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrenutnoZaduzeneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
