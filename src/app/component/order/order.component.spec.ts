import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZamowComponent } from './zamow.component';

describe('ZamowComponent', () => {
  let component: ZamowComponent;
  let fixture: ComponentFixture<ZamowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZamowComponent]
    });
    fixture = TestBed.createComponent(ZamowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
