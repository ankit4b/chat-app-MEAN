import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSidebarComponent } from './users-sidebar.component';

describe('UsersSidebarComponent', () => {
  let component: UsersSidebarComponent;
  let fixture: ComponentFixture<UsersSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersSidebarComponent]
    });
    fixture = TestBed.createComponent(UsersSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
