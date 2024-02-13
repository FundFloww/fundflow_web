import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowIdeasComponent } from './show-ideas.component';

describe('ShowIdeasComponent', () => {
  let component: ShowIdeasComponent;
  let fixture: ComponentFixture<ShowIdeasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowIdeasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
