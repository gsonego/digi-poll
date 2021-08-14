import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalBannerComponent } from './horizontal-banner.component';

describe('HorizontalBannerComponent', () => {
  let component: HorizontalBannerComponent;
  let fixture: ComponentFixture<HorizontalBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
