import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedimageComponent } from './generatedimage.component';

describe('GeneratedimageComponent', () => {
  let component: GeneratedimageComponent;
  let fixture: ComponentFixture<GeneratedimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratedimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
