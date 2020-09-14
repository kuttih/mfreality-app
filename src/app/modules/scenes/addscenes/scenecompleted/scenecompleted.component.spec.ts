import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenecompletedComponent } from './scenecompleted.component';

describe('ScenecompletedComponent', () => {
  let component: ScenecompletedComponent;
  let fixture: ComponentFixture<ScenecompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenecompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenecompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
