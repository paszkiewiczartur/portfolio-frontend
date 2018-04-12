import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsStartComponent } from './tags-start.component';

describe('TagsStartComponent', () => {
  let component: TagsStartComponent;
  let fixture: ComponentFixture<TagsStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
