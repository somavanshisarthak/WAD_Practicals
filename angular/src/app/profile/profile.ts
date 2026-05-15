import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import type { UserSession } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  user: UserSession | null = null;

  ngOnInit(): void {
    this.user = this.auth.getCurrentUser();
    // No session → cannot show profile; go back to login.
    if (!this.user) {
      void this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.auth.logout();
  }
}
