import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGusetComponent } from './list-guset.component';

describe('ListGusetComponent', () => {
  let component: ListGusetComponent;
  let fixture: ComponentFixture<ListGusetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListGusetComponent]
    });
    fixture = TestBed.createComponent(ListGusetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
