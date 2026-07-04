import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';
import { finalize, first, take } from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  imports: [ 
    ReactiveFormsModule,
    NgClass,
    RouterLink
   ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  host: { class: 'login-page' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = signal('');
  shake = signal(false);


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value)
      .pipe(
        first(),
        finalize(() => {
          // This always runs at the very end
          this.loading = false; 
        })
      )
      .subscribe({
        // next: () => {
        //   // this.router.navigate([this.returnUrl]);
        // },
        error: (error) => {
          this.error.set(error?.error?.message ?? error?.statusText);
          this.loading = false;
          if (error?.status === 401) {
            this.shake.set(true);
            setTimeout(() => {
              this.shake.set(false);
              this.loginForm.get('password')?.reset();
            }, 500); 
          }
        }
      })
      ;
  }
}
