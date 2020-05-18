import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-home',
  template: `
      <div class="list-content">
          <h1>Home</h1>
          <p><b>Willkommen bei KWM gegen Corona!</b></p>
          <p>Dies ist eine Plattform, die in Zeiten von Covid-19,
              älteren und bedürftigen Personen die Möglichkeit bietet
              Einkäufe durch jüngere Personen übernehmen zu lassen.
              Dabei kann eine hilfesuchende Person eine Einkaufsliste
              online stellen, welche dann ganz einfach von einem 
              Freiwilligen übernommen werden kann.</p>
          <br/>
          <a routerLink="../lists" class="shoppinglist-button nav-btn">
              Einkaufslisten ansehen
              <i class="right arrow icon"></i>
          </a>
      </div>
  `,
  styles: []
})
export class HomeComponent { }
