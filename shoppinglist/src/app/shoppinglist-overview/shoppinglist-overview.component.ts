import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Item, User, Shoppinglist } from "../shared/shoppinglist";
import { ShoppinglistStoreService } from "../shared/shoppinglist-store.service";

@Component({
  selector: 'sl-shoppinglist-overview',
  templateUrl: './shoppinglist-overview.component.html',
  styles: []
})
export class ShoppinglistOverviewComponent implements OnInit {

  shoppinglists: Shoppinglist[];
  @Output() showListDetailsEvent = new EventEmitter<Shoppinglist>();

  constructor(private sl: ShoppinglistStoreService){ }

  ngOnInit() {
      this.sl.getAll().subscribe(res => this.shoppinglists = res);
  }
}
