import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilInversorComponent } from './perfil-inversor.component';

describe('PerfilInversorComponent', () => {
  let component: PerfilInversorComponent;
  let fixture: ComponentFixture<PerfilInversorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilInversorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilInversorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
