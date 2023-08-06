import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnjigaModerComponent } from './knjiga-moder.component';

describe('KnjigaModerComponent', () => {
  let component: KnjigaModerComponent;
  let fixture: ComponentFixture<KnjigaModerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnjigaModerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KnjigaModerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
