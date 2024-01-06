import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermsgCardComponent } from './usermsg-card.component';

describe('UsermsgCardComponent', () => {
  let component: UsermsgCardComponent;
  let fixture: ComponentFixture<UsermsgCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsermsgCardComponent]
    });
    fixture = TestBed.createComponent(UsermsgCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
