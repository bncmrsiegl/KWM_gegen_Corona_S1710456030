import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppinglistElementComponent } from './shoppinglist-element.component';

describe('ShoppinglistElementComponent', () => {
  let component: ShoppinglistElementComponent;
  let fixture: ComponentFixture<ShoppinglistElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppinglistElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppinglistElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
