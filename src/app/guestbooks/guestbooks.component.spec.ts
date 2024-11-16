import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestbooksComponent } from './guestbooks.component';

describe('GuestbooksComponent', () => {
  let component: GuestbooksComponent;
  let fixture: ComponentFixture<GuestbooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestbooksComponent]
    });
    fixture = TestBed.createComponent(GuestbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
