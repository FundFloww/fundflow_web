import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaAdminUsuariosComponent } from './zona-admin-usuarios.component';

describe('ZonaAdminUsuariosComponent', () => {
  let component: ZonaAdminUsuariosComponent;
  let fixture: ComponentFixture<ZonaAdminUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZonaAdminUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZonaAdminUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
