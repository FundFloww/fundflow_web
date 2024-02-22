import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoUsuarioModalComponent } from './nuevo-usuario-modal.component';

describe('NuevoUsuarioModalComponent', () => {
  let component: NuevoUsuarioModalComponent;
  let fixture: ComponentFixture<NuevoUsuarioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoUsuarioModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevoUsuarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
