import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Feedback, Shoppinglist} from "../shared/shoppinglist";
import { ShoppinglistStoreService } from "../shared/shoppinglist-store.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ShoppinglistFactory } from "../shared/shoppinglist-factory";
import { AuthenticationService } from '../shared/authentication.service';
import {FormBuilder, FormGroup} from "@angular/forms";
import { FeedbackService } from "../shared/feedback.service";

@Component({
  selector: 'sl-shoppinglist-details',
  templateUrl: './shoppinglist-details.component.html',
  styles: []
})
export class ShoppinglistDetailsComponent implements OnInit {

    shoppinglist: Shoppinglist = ShoppinglistFactory.empty();
    currentUser = this.authService.getCurrentUserId();
    feedbackForm: FormGroup;
    newFeedback: Feedback = Feedback.empty();

    constructor(
        private fb: FormBuilder,
        private sl: ShoppinglistStoreService,
        private route: ActivatedRoute,
        private router: Router,
        public authService: AuthenticationService
    ) { }

    ngOnInit() {
        const params = this.route.snapshot.params;
        this.sl.getSingle(params['id']).subscribe(res => {this.shoppinglist = res; console.log(res)});

        this.authService.isHelper();

        this.feedbackForm = this.fb.group({text:this.newFeedback.text})
    }

    removeShoppinglist() {
        if(confirm('Einkaufsliste wirklich löschen?')) {
            this.sl.remove(this.shoppinglist.id)
                .subscribe(res => this.router.navigate(['../'],
                    { relativeTo: this.route}));
        }
    }

    checkPayment(){
        if(this.shoppinglist.total_price == 0){
            return true;
        }
        else return false;
    }

    takeList() {
        if(confirm('Wollen Sie diese Einkaufsliste übernehmen?')) {
            console.log(this.currentUser);
            const shoppinglist:Shoppinglist = ShoppinglistFactory.fromObject(this.shoppinglist);
            shoppinglist.helper_id = this.currentUser;
            this.sl.update(shoppinglist).subscribe(res => this.router.navigate(['../'],
                {relativeTo: this.route}));
        }
    }

    setPrice() {
        const price = prompt('Bitte geben Sie den bezahlten Preis ein! (€ ###.##)');
        if (price != null){
            console.log(price);
            const newTotalPrice = +price;
            const shoppinglist:Shoppinglist = ShoppinglistFactory.fromObject(this.shoppinglist);
            shoppinglist.total_price = newTotalPrice;
            console.log(shoppinglist);
            this.sl.update(shoppinglist).subscribe(res => this.router.navigate(['../'],
                {relativeTo: this.route}));
        }
    }

    addFeedback(){
        const params = this.route.snapshot.params;
        const newFeedback:Feedback = Feedback.fromObject(this.feedbackForm.value);
        newFeedback.writer_id = this.currentUser;
        console.log("Writer: " + this.currentUser);
        newFeedback.text = this.feedbackForm.value.text;
        console.log("Feedback: " + newFeedback);

        this.sl.addFeedback(newFeedback, params['id']).subscribe(res => this.router.navigate(['../'],
            {relativeTo: this.route}));

    }
}
