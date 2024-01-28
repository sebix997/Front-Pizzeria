import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WlasneComponent } from './wlasne.component';

describe('WlasneComponent', () => {
  let component: WlasneComponent;
  let fixture: ComponentFixture<WlasneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WlasneComponent]
    });
    fixture = TestBed.createComponent(WlasneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
