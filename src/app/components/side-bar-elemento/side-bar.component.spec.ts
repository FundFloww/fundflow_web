import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarElementoComponent } from './side-bar-elemento.component';

describe('IdeaComponent', () => {
  let component: SideBarElementoComponent;
  let fixture: ComponentFixture<SideBarElementoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarElementoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideBarElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
