import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginOutput, RegisterSystemUserOutput } from '../../../@core/data-models/auth/auth-models';
import { AuthService } from '../../../@core/data-services/auth/auth.service';
import { UserSessionService } from '../../../@core/data-services/auth/user-session.service';
import { hasError } from '../../../shared/class/custom-validators';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    TranslateModule,
    PasswordModule,
    MessageModule,
    MessagesModule,
    ReactiveFormsModule 
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  //injecttion of Services
  authService = inject(AuthService);
  userSession = inject(UserSessionService);
  router = inject(Router);

  loginForm: FormGroup = new FormGroup({});
  hasError=hasError;
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const body = this.loginForm.value as LoginOutput;
      this.authService.login(body).subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.userSession.setUserData(response.data);
            this.router.navigate(['/home']); //navigate to the home page
          } else {
            this.errorMessage = response.message;
          }
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        }
      });
    }
  }

  goToRegister(){
    this.router.navigate(['/auth/register-user']);
  }
  
}
