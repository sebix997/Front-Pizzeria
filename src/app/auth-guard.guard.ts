import { CanActivateFn } from '@angular/router';
import {AuthenService} from "./services/authen.service";

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = new AuthenService(); // Utwórz instancję serwisu autoryzacji (zależnie od implementacji)

  // Sprawdź, czy użytkownik jest zalogowany
  if (authService.isAuthenticatedUser()) {
    console.log("DZIA:A")
    return true;
  } else {
    // Jeśli użytkownik nie jest zalogowany, przekieruj go do strony logowania
    // (lub zaimplementuj inny sposób obsługi braku autoryzacji)
    window.location.href = '/login'; // Przykładowe przekierowanie URL
    return false; // Zablokuj dostęp do trasy
  }
};
