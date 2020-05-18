import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppinglistOverviewComponent } from './shoppinglist-overview.component';

describe('ShoppinglistOverviewComponent', () => {
  let component: ShoppinglistOverviewComponent;
  let fixture: ComponentFixture<ShoppinglistOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppinglistOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppinglistOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
