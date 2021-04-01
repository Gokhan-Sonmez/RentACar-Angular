import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarAddImageComponent } from './car-add-image.component';

describe('CarAddImageComponent', () => {
  let component: CarAddImageComponent;
  let fixture: ComponentFixture<CarAddImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarAddImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarAddImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
