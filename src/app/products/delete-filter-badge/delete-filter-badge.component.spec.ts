import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFilterBadgeComponent } from './delete-filter-badge.component';

describe('DeleteFilterBadgeComponent', () => {
  let component: DeleteFilterBadgeComponent;
  let fixture: ComponentFixture<DeleteFilterBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteFilterBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteFilterBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
