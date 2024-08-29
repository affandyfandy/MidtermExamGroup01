import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarInvoiceComponent } from './search-bar-invoice.component';

describe('SearchBarInvoiceComponent', () => {
  let component: SearchBarInvoiceComponent;
  let fixture: ComponentFixture<SearchBarInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBarInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
