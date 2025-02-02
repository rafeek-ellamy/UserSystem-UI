import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { LookupsDto } from '../../../@core/data-models/shared-models';
import { RolesService } from '../../../@core/data-services/roles/roles.service';
import { UsersDataService } from '../../../@core/data-services/users/users-data.service';
import { CustomValidators, hasError } from '../../../shared/class/custom-validators';
import { UpdateSystemUserOutputDto, UserModel } from '../../../@core/data-models/users-models';

@Component({
  selector: 'app-update-user',
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
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {
  //injection of Services
  fb = inject(FormBuilder);
  rolesService = inject(RolesService);
  usersDataService = inject(UsersDataService);
  ref = inject(DynamicDialogRef);
  config = inject(DynamicDialogConfig);
  
  userForm!: FormGroup;
  hasError=hasError;
  errorMessage: string = '';

  //all roles in database
  roles: LookupsDto[] = [];
  rolesOptions : any = [];

  //current user 
  userId: string | null = null;
  userData: UserModel | null = null;

  //all user roles in database
  selectedRoles : any = [];

  constructor() {}

  ngOnInit(): void {
    this.userId = this.config.data?.userId || null;
    if (this.userId) {
      this.getAllRoles();
      this.getUserData();
      this.initliazeForm();
    }else{
      this.ref.close();
    }
  }

  initliazeForm() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      userName: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
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
        if (response.success) {
          this.roles = response.data!;
          this.rolesOptions = this.roles.map((role:LookupsDto) => ({ name: role.nameEn, value: role.id }));
        } else {
        }
      },
      error: (err) => {},
    });
  }

  getUserData() {
    this.selectedRoles = [];
    this.usersDataService.getById(this.userId!).subscribe({
      next: (response) => {
        if (response.success) {
          this.userData = response.data!;
          this.userForm.patchValue(this.userData);
          this.selectedRoles = this.userData.roles.map(role => ({
            name: role.nameEn,
            value: role.id
          }));
        } else {
          this.ref.close();
        }
      },
      error: (err) => {},
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      let dto : UpdateSystemUserOutputDto = {} as UpdateSystemUserOutputDto;
      dto = this.userForm.value;
      dto.userId = this.userId!;
      dto.roles = dto.roles.map((role:any) => role.name);

      this.usersDataService.update(dto).subscribe({
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