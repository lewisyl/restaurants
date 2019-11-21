import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRateComponent } from './new-rate.component';

describe('NewRateComponent', () => {
  let component: NewRateComponent;
  let fixture: ComponentFixture<NewRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
