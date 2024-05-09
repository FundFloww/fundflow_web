import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaItemAdminComponent } from './idea-item-admin.component';

describe('IdeaItemAdminComponent', () => {
  let component: IdeaItemAdminComponent;
  let fixture: ComponentFixture<IdeaItemAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdeaItemAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdeaItemAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
