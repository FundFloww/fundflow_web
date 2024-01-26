import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilEmprendedorComponent } from './perfil-emprendedor.component';

describe('PerfilEmprendedorComponent', () => {
  let component: PerfilEmprendedorComponent;
  let fixture: ComponentFixture<PerfilEmprendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilEmprendedorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilEmprendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
