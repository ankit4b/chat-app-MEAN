import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSidebarHeaderComponent } from './users-sidebar-header.component';

describe('UsersSidebarHeaderComponent', () => {
  let component: UsersSidebarHeaderComponent;
  let fixture: ComponentFixture<UsersSidebarHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersSidebarHeaderComponent]
    });
    fixture = TestBed.createComponent(UsersSidebarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
