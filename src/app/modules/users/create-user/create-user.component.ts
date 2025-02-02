import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomValidators, hasError } from '../../../shared/class/custom-validators';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { RolesService } from '../../../@core/data-services/roles/roles.service';
import { LookupsDto } from '../../../@core/data-models/shared-models';
import { UsersDataService } from '../../../@core/data-services/users/users-data.service';
import { CreateSystemUserOutputDto } from '../../../@core/data-models/users-models';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    MessagesModule,
    ReactiveFormsModule,
    MultiSelectModule 
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  //injection of Services
  rolesService = inject(RolesService);
  usersDataService = inject(UsersDataService);
  
  userForm: FormGroup;
  hasError=hasError;
  errorMessage: string = '';
  roles: LookupsDto[] = [];
  roleOptions : any = [];

  constructor(private fb: FormBuilder, public ref: DynamicDialogRef) {
    this.getAllRoles();
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      userName: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
          Validators.pattern(CustomValidators.validPasswordRegex)
        ]
      ],
      roles: [[], Validators.required]
    });
  }

  getAllRoles() {
    this.rolesService.getAllRoles().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.roles = response.data;
          this.roleOptions = this.roles.map((role:LookupsDto) => ({ name: role.nameEn, value: role.id }));
        } else {
        }
      },
      error: (err) => {},
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      let dto : CreateSystemUserOutputDto = {} as CreateSystemUserOutputDto;
      dto = this.userForm.value;
      dto.roles = dto.roles.map((role:any) => role.name);
      this.usersDataService.create(dto).subscribe({
        next: (response) => {
          if (response.success) {
            this.ref.close(this.userForm.value);
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

  onCancel() {
    this.ref.close();
  }
}
