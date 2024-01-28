import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecjalOrderComponent } from './specjal-order.component';

describe('SpecjalOrderComponent', () => {
  let component: SpecjalOrderComponent;
  let fixture: ComponentFixture<SpecjalOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecjalOrderComponent]
    });
    fixture = TestBed.createComponent(SpecjalOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
