import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarUsuarioModalComponent } from './modificar-usuario-modal.component';

describe('ModificarUsuarioModalComponent', () => {
  let component: ModificarUsuarioModalComponent;
  let fixture: ComponentFixture<ModificarUsuarioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarUsuarioModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarUsuarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
