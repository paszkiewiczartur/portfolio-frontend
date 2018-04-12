import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesStartComponent } from './courses-start.component';

describe('CoursesStartComponent', () => {
  let component: CoursesStartComponent;
  let fixture: ComponentFixture<CoursesStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
