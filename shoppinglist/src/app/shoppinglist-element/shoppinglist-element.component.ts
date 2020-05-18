import {Component, Input, OnInit} from '@angular/core';
import {Shoppinglist} from "../shared/shoppinglist";

@Component({
    selector: 'a.sl-shoppinglist-element',
    templateUrl: './shoppinglist-element.component.html',
    styles: []
})
export class ShoppinglistElementComponent implements OnInit {

    @Input() shoppinglist: Shoppinglist

    constructor() {
    }

    ngOnInit() {
    }

    checkPayment() {
        //console.log(this.shoppinglist.total_price);
        if (this.shoppinglist.total_price == 0) {
            return true;
        }
        else return false;
    }

}
