import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCurrencyComponent } from './chart-currency.component';

describe('ChartCurrencyComponent', () => {
  let component: ChartCurrencyComponent;
  let fixture: ComponentFixture<ChartCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartCurrencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
