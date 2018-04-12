import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTagsComponent } from './book-tags.component';

describe('BookTagsComponent', () => {
  let component: BookTagsComponent;
  let fixture: ComponentFixture<BookTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
