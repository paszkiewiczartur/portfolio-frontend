import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTagsComponent } from './course-tags.component';

describe('CourseTagsComponent', () => {
  let component: CourseTagsComponent;
  let fixture: ComponentFixture<CourseTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
