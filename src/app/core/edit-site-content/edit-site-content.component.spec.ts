import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSiteContentComponent } from './edit-site-content.component';

describe('EditSiteContentComponent', () => {
  let component: EditSiteContentComponent;
  let fixture: ComponentFixture<EditSiteContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSiteContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSiteContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
