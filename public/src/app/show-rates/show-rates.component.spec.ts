import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRatesComponent } from './show-rates.component';

describe('ShowRatesComponent', () => {
  let component: ShowRatesComponent;
  let fixture: ComponentFixture<ShowRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
