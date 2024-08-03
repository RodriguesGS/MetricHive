import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackTopComponent } from './back-top.component';

describe('BackTopComponent', () => {
  let component: BackTopComponent;
  let fixture: ComponentFixture<BackTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackTopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
