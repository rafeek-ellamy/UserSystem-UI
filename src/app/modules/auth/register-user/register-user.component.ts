import { Component, inject, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { CommonModule } from '@angular/common';
import { CustomValidators, hasError } from '../../../shared/class/custom-validators';
import { TranslateModule, } from '@ngx-translate/core';
import { AuthService } from '../../../@core/data-services/auth/auth.service';
import { RegisterSystemUserOutput } from '../../../@core/data-models/auth/auth-models';
import { UserSessionService } from '../../../@core/data-services/auth/user-session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
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
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {
  //injecttion of Services
  authService = inject(AuthService);
  userSession = inject(UserSessionService);
  router = inject(Router);

  registerForm: FormGroup = new FormGroup({});
  hasError=hasError;
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      userName: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern(CustomValidators.validPasswordRegex)]],
    });
  }

  isFieldInvalid(field: string): boolean | undefined {
    return this.registerForm.get(field)?.invalid && this.registerForm.get(field)?.touched;
  }

  register() {
    if (this.registerForm.valid) {
      const body = this.registerForm.value as RegisterSystemUserOutput;
      this.authService.register(body).subscribe({
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

  goToLogin(){
    this.router.navigate(['/auth/login']);
  }
}
