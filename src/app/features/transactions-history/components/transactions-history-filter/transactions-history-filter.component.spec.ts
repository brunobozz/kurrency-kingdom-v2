import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsHistoryFilterComponent } from './transactions-history-filter.component';

describe('TransactionsHistoryFilterComponent', () => {
  let component: TransactionsHistoryFilterComponent;
  let fixture: ComponentFixture<TransactionsHistoryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsHistoryFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsHistoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
