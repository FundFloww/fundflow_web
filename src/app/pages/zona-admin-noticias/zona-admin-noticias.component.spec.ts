import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaAdminNoticiasComponent } from './zona-admin-noticias.component';

describe('ZonaAdminNoticiasComponent', () => {
  let component: ZonaAdminNoticiasComponent;
  let fixture: ComponentFixture<ZonaAdminNoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZonaAdminNoticiasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZonaAdminNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
