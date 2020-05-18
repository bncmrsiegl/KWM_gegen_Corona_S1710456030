import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppinglistFormComponent } from './shoppinglist-form.component';

describe('ShoppinglistFormComponent', () => {
  let component: ShoppinglistFormComponent;
  let fixture: ComponentFixture<ShoppinglistFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppinglistFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppinglistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
