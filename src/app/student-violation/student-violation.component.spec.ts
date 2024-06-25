import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViolationComponent } from './student-violation.component';

describe('StudentViolationComponent', () => {
  let component: StudentViolationComponent;
  let fixture: ComponentFixture<StudentViolationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentViolationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentViolationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
