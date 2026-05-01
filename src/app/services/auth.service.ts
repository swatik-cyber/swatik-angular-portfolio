import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { AuthResponse, LoginRequest } from '../models';

const USERS = [
  { username: 'swatik', password: 'Admin@123', role: 'ADMIN', token: 'hardcoded-admin-token', avatarInitials: 'SW' },
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(this.loadUser());
  public currentUser$ = this.currentUserSubject.asObservable();
  constructor() {}
  private loadUser(): AuthResponse | null {
    try { const u = localStorage.getItem('portfolio_user'); return u ? JSON.parse(u) : null; } catch { return null; }
  }
  login(req: LoginRequest): Observable<AuthResponse> {
    const found = USERS.find(u => u.username === req.username && u.password === req.password);
    if (found) {
      const res: AuthResponse = { token: found.token, username: found.username, role: found.role, avatarInitials: found.avatarInitials };
      localStorage.setItem('portfolio_token', res.token);
      localStorage.setItem('portfolio_user', JSON.stringify(res));
      this.currentUserSubject.next(res);
      return of(res);
    }
    return throwError(() => ({ error: { message: 'Invalid credentials' } }));
  }
  logout(): void { localStorage.removeItem('portfolio_token'); localStorage.removeItem('portfolio_user'); this.currentUserSubject.next(null); }
  getToken(): string | null { return localStorage.getItem('portfolio_token'); }
  get currentUser(): AuthResponse | null { return this.currentUserSubject.value; }
  isLoggedIn(): boolean { return !!this.getToken(); }
  hasRole(role: string): boolean { return this.currentUser?.role === role; }
  isAdmin(): boolean { return this.hasRole('ADMIN'); }
}
