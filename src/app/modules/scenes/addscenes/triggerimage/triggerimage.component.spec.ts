import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerimageComponent } from './triggerimage.component';

describe('TriggerimageComponent', () => {
  let component: TriggerimageComponent;
  let fixture: ComponentFixture<TriggerimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriggerimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriggerimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
