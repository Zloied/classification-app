import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowerDetailsComponent } from './flower-details.component';

describe('FlowerDetailsComponent', () => {
  let component: FlowerDetailsComponent;
  let fixture: ComponentFixture<FlowerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
