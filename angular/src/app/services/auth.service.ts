import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import type { UserRecord, UserSession } from '../models/user.model';

/** localStorage keys for this demo (no real server). */
const USERS_KEY = 'wad_users';
const SESSION_KEY = 'wad_session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);

  /** Read all registered users from localStorage. */
  private getUsers(): UserRecord[] {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as UserRecord[];
    } catch {
      return [];
    }
  }

  /** Save the full users list (used after registration). */
  private saveUsers(users: UserRecord[]): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  register(user: UserRecord): { ok: true } | { ok: false; message: string } {
    const users = this.getUsers();
    const exists = users.some((u) => u.email.toLowerCase() === user.email.toLowerCase());
    if (exists) {
      return { ok: false, message: 'This email is already registered.' };
    }
    users.push(user);
    this.saveUsers(users);
    return { ok: true };
  }

  /** Returns true if email + password match a stored user. */
  login(email: string, password: string): boolean {
    const users = this.getUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    );
    if (!found) return false;
    const session: UserSession = { name: found.name, email: found.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
  }

  logout(): void {
    localStorage.removeItem(SESSION_KEY);
    void this.router.navigate(['/login']);
  }

  getCurrentUser(): UserSession | null {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as UserSession;
    } catch {
      return null;
    }
  }
}
