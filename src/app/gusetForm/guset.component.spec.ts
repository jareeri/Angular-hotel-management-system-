import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GusetComponent } from './guset.component';

describe('GusetComponent', () => {
  let component: GusetComponent;
  let fixture: ComponentFixture<GusetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GusetComponent]
    });
    fixture = TestBed.createComponent(GusetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
