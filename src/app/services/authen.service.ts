import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  private readonly storageKey: string = 'authData';
  private isAuthenticated: boolean = false;

  constructor() {
    // Przy wczytywaniu usługi sprawdzamy, czy istnieje zapisane dane o zalogowanym użytkowniku
    const savedData = sessionStorage.getItem(this.storageKey);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.isAuthenticated = parsedData.isAuthenticated;
    }
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  setAuthenticated(value: boolean): void {
    this.isAuthenticated = value;
    this.saveDataToSessionStorage(); // Zapisz aktualny stan do sessionStorage
  }

  private saveDataToSessionStorage(): void {
    const dataToSave = { isAuthenticated: this.isAuthenticated };
    sessionStorage.setItem(this.storageKey, JSON.stringify(dataToSave));
  }
}
