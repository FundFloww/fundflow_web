import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaAdminIdeasComponent } from './zona-admin-ideas.component';

describe('ZonaAdminIdeasComponent', () => {
  let component: ZonaAdminIdeasComponent;
  let fixture: ComponentFixture<ZonaAdminIdeasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZonaAdminIdeasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZonaAdminIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
