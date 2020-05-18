import {Component} from '@angular/core';
import {Shoppinglist} from "./shared/shoppinglist";
import {AuthenticationService} from "./shared/authentication.service";

@Component({
    selector: 'sl-root',
    templateUrl: './app.component.html'
})

export class AppComponent {

    constructor(private authService: AuthenticationService) {
    }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    getLoginLabel() {
        if (this.isLoggedIn()) {
            return 'Abmelden';
        } else {
            return 'Anmelden';
        }
    }

}