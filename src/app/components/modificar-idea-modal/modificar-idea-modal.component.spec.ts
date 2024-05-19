import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarIdeaModalComponent } from './modificar-idea-modal.component';

describe('ModificarIdeaModalComponent', () => {
  let component: ModificarIdeaModalComponent;
  let fixture: ComponentFixture<ModificarIdeaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarIdeaModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarIdeaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
