import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarNoticiaModalComponent } from './modificar-noticia-modal.component';

describe('ModificarNoticiaModalComponent', () => {
  let component: ModificarNoticiaModalComponent;
  let fixture: ComponentFixture<ModificarNoticiaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarNoticiaModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarNoticiaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
