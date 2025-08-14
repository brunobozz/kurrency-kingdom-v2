import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsHistoryListComponent } from './transactions-history-list.component';

describe('TransactionsHistoryListComponent', () => {
  let component: TransactionsHistoryListComponent;
  let fixture: ComponentFixture<TransactionsHistoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsHistoryListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
