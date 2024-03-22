import { Injectable, InjectionToken, PLATFORM_ID, inject } from '@angular/core';
import { User } from '../../auth/interfaces/user.model';

export const LOCAL_STORAGE = new InjectionToken<Storage>(
  'window local storage object',
  {
    providedIn: 'root',
    factory: () => {
      return inject(PLATFORM_ID) === 'browser'
        ? window.localStorage
        : ({} as Storage);
    },
  }
);

const LOCAL_STORAGE_KEY_FOR_AUTH = 'user_data';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  storage = inject(LOCAL_STORAGE);

  loadAuthInfo() {
    const userData = this.storage.getItem(LOCAL_STORAGE_KEY_FOR_AUTH);
    return userData;
  }

  saveAuthInfo(user: User) {
    this.storage.setItem(LOCAL_STORAGE_KEY_FOR_AUTH, JSON.stringify(user));
  }

  clearAuthInfo() {
    this.storage.removeItem(LOCAL_STORAGE_KEY_FOR_AUTH);
  }
}
