import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {SpecjalIntegrentsComponentModel} from "../models/SpecjalIntegrentsComponentModel";

@Injectable({
    providedIn: 'root',
})


export class shareDataService {
    private storageKey = 'sharedData';
    private storageKey2 = 'sharedData';
    private storedData = this.getStoredData();

    private sharedDataId: number[] = this.storedData?.id || [];
    private sharedDataCena: number[] = this.storedData?.cena || [];
    private sharedDataName: string[] = this.storedData?.name || [];


    private pizzaData: any;

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
        this.saveData();
        sessionStorage.clear();

    }
    private saveData() {
        const dataToSave = { id: this.sharedDataId, name: this.sharedDataName, cena: this.sharedDataCena };
        sessionStorage.setItem(this.storageKey, JSON.stringify(dataToSave));
    }

    private getStoredData(): { id: number[]; name: string[]; cena: number[] } | null {
        const storedData = sessionStorage.getItem(this.storageKey);
        return storedData ? JSON.parse(storedData) : null;
    }


  saveSpecjalPizzaData(model:SpecjalIntegrentsComponentModel) {
      console.log(model.prince);
      sessionStorage.setItem(this.storageKey2, JSON.stringify(model));
  }

  getPizzaData() {
      const storedData = sessionStorage.getItem(this.storageKey2);
      return storedData ? JSON.parse(storedData) : null;
  }
}
