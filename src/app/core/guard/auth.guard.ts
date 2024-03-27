import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  console.log('🕵️‍♂️ 🥷🏻 : ==> state:', state);
  console.log('🕵️‍♂️ 🥷🏻 : ==> route:', route);
  return true;
};
