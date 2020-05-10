import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowerCategoryMenuComponent } from './flower-category-menu.component';

describe('FlowerCategoryMenuComponent', () => {
  let component: FlowerCategoryMenuComponent;
  let fixture: ComponentFixture<FlowerCategoryMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowerCategoryMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowerCategoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
