import { Component } from '@angular/core';

@Component({
    selector: 'app-onas',
    template: `
        <div class="header">
            <nav class="navbar">
                <div class="navbar-brand">{{ title }}</div>
                <div class="navbar-end">
                    <a class="navbar-item" routerLink="/menu">Menu</a>
                    <a class="navbar-item" routerLink="/wlasne">Stwórz Własną Pizze</a>
                    <a class="navbar-item" routerLink="/about-us">O nas</a>
                    <a class="navbar-item" routerLink="/kontakt">Kontakt</a>
                </div>
            </nav>
        </div>


    <div class="main-content">
        <div class="pizzeria-description">
            <h1>{{ title }}</h1>
            <p>"{{ title }}" to kameralna pizzeria usytuowana w sercu małego miasteczka, specjalizująca się w przygotowywaniu autentycznej włoskiej pizzy w tradycyjnym kamiennym piecu. Menu obejmuje zarówno klasyczne smaki, jak i unikalne kompozycje, z użyciem świeżych składników. Przytulne wnętrze tworzy niesamowitą atmosferę, podkreśloną aromatem pieczenia w kamiennym piecu. Pizzeria oferuje dania na miejscu, na wynos i dostawę, z przyjazną obsługą służącą pomocą w wyborze potrawy. "{{ title }}" to nie tylko miejsce na pyszną pizzę, ale także centrum włoskiej kultury kulinarnej.</p>
        </div>
    </div>
    `,
    styleUrls: ['./onas.component.css']
})

export class OnasComponent {
    title = 'Pizzeria PoSameBrzegi';
}
