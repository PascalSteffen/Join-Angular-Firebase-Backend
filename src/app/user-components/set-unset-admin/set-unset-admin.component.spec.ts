import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetUnsetAdminComponent } from './set-unset-admin.component';

describe('SetUnsetAdminComponent', () => {
  let component: SetUnsetAdminComponent;
  let fixture: ComponentFixture<SetUnsetAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetUnsetAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetUnsetAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
