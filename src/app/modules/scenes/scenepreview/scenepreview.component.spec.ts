import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenepreviewComponent } from './scenepreview.component';

describe('ScenepreviewComponent', () => {
  let component: ScenepreviewComponent;
  let fixture: ComponentFixture<ScenepreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenepreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenepreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
