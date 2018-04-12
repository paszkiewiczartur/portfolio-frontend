import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksStartComponent } from './books-start.component';

describe('BooksStartComponent', () => {
  let component: BooksStartComponent;
  let fixture: ComponentFixture<BooksStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
