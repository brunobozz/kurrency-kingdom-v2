import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsHistoryHeaderComponent } from './transactions-history-header.component';

describe('TransactionsHistoryHeaderComponent', () => {
  let component: TransactionsHistoryHeaderComponent;
  let fixture: ComponentFixture<TransactionsHistoryHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsHistoryHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsHistoryHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
