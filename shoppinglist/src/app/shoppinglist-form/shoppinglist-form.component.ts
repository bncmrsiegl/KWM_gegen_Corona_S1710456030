import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";

import { ShoppinglistFormErrorMessages} from "./shoppinglist-form-error-messages";
import { ShoppinglistFactory } from "../shared/shoppinglist-factory";
import { ShoppinglistStoreService } from "../shared/shoppinglist-store.service";
import { Shoppinglist, Item } from "../shared/shoppinglist";

@Component({
    selector: 'sl-shoppinglist-form',
    templateUrl: './shoppinglist-form.component.html'
})
export class ShoppinglistFormComponent implements OnInit {

    shoppinglistForm: FormGroup;
    shoppinglist = ShoppinglistFactory.empty();
    errors: { [key: string]: string } = {};
    isUpdatingList = false;
    items: FormArray;

    constructor(private fb: FormBuilder, private sl: ShoppinglistStoreService,
                private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        const id = this.route.snapshot.params['id'];
        if (id) {
            this.isUpdatingList = true;
            this.sl.getSingle(id).subscribe(shoppinglist => {
                this.shoppinglist = shoppinglist;
                this.initShoppinglist();
            });
        }
        this.initShoppinglist();
    }

    initShoppinglist() {
        this.buildThumbnailsArray();
        this.shoppinglistForm = this.fb.group({
            id: this.shoppinglist.id,
            title: [this.shoppinglist.title, Validators.required],
            dueDate: [this.shoppinglist.dueDate, Validators.required],
            total_price: this.shoppinglist.total_price,
            items: this.items
        });
        this.shoppinglistForm.statusChanges.subscribe(() => this.updateErrorMessages());
        console.log(this.shoppinglist);
    }

    buildThumbnailsArray() {
        console.log(this.shoppinglist.items);
        if(this.shoppinglist.items.length == 0) { //if new list had no items - but in edit mode
            this.shoppinglist.items.push(new Item(0, '', 0, null))
        }
        this.items = this.fb.array(
            this.shoppinglist.items.map(
                t => this.fb.group({
                    id: this.fb.control(t.id),
                    description: this.fb.control(t.description),
                    quantity: this.fb.control(t.quantity),
                    max_price: this.fb.control(t.max_price)
                })
            )
        );
        console.log(this.items);
    }

    addThumbnailControl() {
        this.items.push(this.fb.group({description: null, quantity: null, max_price: null}));
    }

    submitForm() {
        //filter empty values
        this.shoppinglistForm.value.items =
            this.shoppinglistForm.value.items.filter(thumbnail => thumbnail.description);

        const shoppinglist: Shoppinglist = ShoppinglistFactory.fromObject(this.shoppinglistForm.value);
        //deep copy - did not work without?
        shoppinglist.items = this.shoppinglistForm.value.items;
        console.log(shoppinglist);

        if(this.isUpdatingList) {
            console.log(this.shoppinglist);
            console.log(this.shoppinglist.dueDate);
            this.sl.update(shoppinglist).subscribe( res => {
                this.router.navigate(['../../lists', shoppinglist.id], {relativeTo: this.route});
            });
        } else {
            shoppinglist.creator_id = 1;
            console.log(shoppinglist);
            console.log(shoppinglist.dueDate);
            this.sl.create(shoppinglist).subscribe( res => {
                this.shoppinglist = ShoppinglistFactory.empty();
                this.shoppinglistForm.reset(ShoppinglistFactory.empty());
                this.router.navigate(['../lists'], {relativeTo: this.route});
            });
        }
    }

    updateErrorMessages() {
        this.errors = {};
        for (const message of ShoppinglistFormErrorMessages) {
            const control = this.shoppinglistForm.get(message.forControl);
            if (control &&
                control.dirty &&
                control.invalid &&
                control.errors[message.forValidator] &&
                !this.errors[message.forControl]) {
                this.errors[message.forControl] = message.text;
            }
        }
    }
}
