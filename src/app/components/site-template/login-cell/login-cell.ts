import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'login-cell',
  templateUrl: './login-cell.html',
  styleUrl: './login-cell.scss',
  host: { class: 'login-cell' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // AuthenticationService
    RouterLink
  ]
})
export class LoginCell {
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((val: boolean) => {
      this.isLoggedIn = val;
    });
  }

  logout() {
    this.authService.logout();
  }
}
