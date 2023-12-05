import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class shareDataService {
    private storageKey = 'sharedData';
    private storedData = this.getStoredData();

    private sharedDataId: number[] = this.storedData?.id || [];
    private sharedDataCena: number[] = this.storedData?.cena || [];
    private sharedDataName: string[] = this.storedData?.name || [];

    dodajDoTablicy(liczba: number, nazwa: string, cena: number) {
        const liczbaAsString = liczba.toString();
        sessionStorage.setItem(liczbaAsString, nazwa);
        this.sharedDataId.push(liczba);
        this.sharedDataName.push(nazwa);
        this.sharedDataCena.push(cena);
        this.saveData();
    }

    pobierzTabliceId() {
        return this.sharedDataId;
    }

    pobierzTabliceName() {
        return this.sharedDataName;
    }

    pobierzTabliceCena() {
        return this.sharedDataCena;
    }

    clearData() {
        this.sharedDataId = [];
        this.sharedDataName = [];
        this.sharedDataCena = [];
        this.saveData(); // Jeśli chcesz również wyczyścić dane w localStorage, wywołaj odpowiednią metodę
    }
    private saveData() {
        const dataToSave = { id: this.sharedDataId, name: this.sharedDataName, cena: this.sharedDataCena };
        sessionStorage.setItem(this.storageKey, JSON.stringify(dataToSave));
    }

    private getStoredData(): { id: number[]; name: string[]; cena: number[] } | null {
        const storedData = sessionStorage.getItem(this.storageKey);
        return storedData ? JSON.parse(storedData) : null;
    }
}
