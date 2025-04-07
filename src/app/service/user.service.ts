import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly USERNAME_KEY = 'chat_username';

  getUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }

  setUsername(username: string): void {
    console.log('Saving username to localStorage:', username);
    localStorage.setItem(this.USERNAME_KEY, username);
  }

  clearUsername(): void {
    localStorage.removeItem(this.USERNAME_KEY);
  }
}

