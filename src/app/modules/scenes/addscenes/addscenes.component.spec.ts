import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddscenesComponent } from './addscenes.component';

describe('AddscenesComponent', () => {
  let component: AddscenesComponent;
  let fixture: ComponentFixture<AddscenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddscenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddscenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
