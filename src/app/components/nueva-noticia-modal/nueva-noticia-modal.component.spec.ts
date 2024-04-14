import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaNoticiaModalComponent } from './nueva-noticia-modal.component';

describe('NuevaNoticiaModalComponent', () => {
  let component: NuevaNoticiaModalComponent;
  let fixture: ComponentFixture<NuevaNoticiaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaNoticiaModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevaNoticiaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
