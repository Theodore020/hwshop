import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeWidthComponent } from './safe-width.component';

describe('SafeWidthComponent', () => {
  let component: SafeWidthComponent;
  let fixture: ComponentFixture<SafeWidthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SafeWidthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SafeWidthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
