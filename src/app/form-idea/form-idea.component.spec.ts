import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIdeaComponent } from './form-idea.component';

describe('FormIdeaComponent', () => {
  let component: FormIdeaComponent;
  let fixture: ComponentFixture<FormIdeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormIdeaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
