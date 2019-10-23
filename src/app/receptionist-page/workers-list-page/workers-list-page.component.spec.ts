import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersListPageComponent } from './workers-list-page.component';

describe('WorkersListPageComponent', () => {
  let component: WorkersListPageComponent;
  let fixture: ComponentFixture<WorkersListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkersListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkersListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
