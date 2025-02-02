import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { UsersDataService } from '../../@core/data-services/users/users-data.service';
import { UserModel } from '../../@core/data-models/users-models';
import { TableColumn } from '../../@core/data-models/shared-models';
import { MyPaginationComponent } from '../../shared/components/my-pagination/my-pagination.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule  } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TranslateModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    MyPaginationComponent,
    ConfirmDialogModule,
    ToastModule,
    RippleModule,
    FormsModule,
    PanelModule 
  ],
  providers: [DialogService,ConfirmationService,MessageService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  //injection of Services
  private usersDataService = inject(UsersDataService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  ref: DynamicDialogRef | undefined;
  totalPages: number = 0;
  pageIndex: number = 1;
  pageSize: number = 5;

  cols: TableColumn[] = [
    { field: 'firstName', header: 'USERS_TABLE.FIRST_NAME', isDate: false },
    { field: 'lastName', header: 'USERS_TABLE.LAST_NAME', isDate: false },
    { field: 'userName', header: 'USERS_TABLE.USER_NAME', isDate: false },
    { field: 'email', header: 'USERS_TABLE.EMAIL', isDate: false },
    { field: 'roles', header: 'USERS_TABLE.ROLE_NAME', isDate: false },
    { field: 'createAt', header: 'USERS_TABLE.CREATE_AT', isDate: true },
    { field: 'updateAt', header: 'USERS_TABLE.UPDATE_AT', isDate: true },
    { field: 'action', header: 'USERS_TABLE.ACTION', isDate: false },
  ];  
  usersData: UserModel[] = [];

  searchCriteria = {
    name: '',
    userName: '',
    email: ''
  };

  ngOnInit(): void {
    this.getUsersData();
  }

  getUsersData() {
    this.usersDataService.getAll(this.searchCriteria.name,
      this.searchCriteria.userName, 
      this.searchCriteria.email,
      this.pageIndex, this.pageSize).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.usersData = response.data;
          this.totalPages = Math.ceil(response.totalCount! / this.pageSize);
        } else {
        }
      },
      error: (err) => {},
    });
  }

  openCreateUserDialog() {
    this.ref = this.dialogService.open(CreateUserComponent, {
      header: 'Create System User',
      width: '40%',
      closable: true,
      contentStyle: { "max-height": "600px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((userData) => {
      if (userData) {
        this.getUsersData();
      }
    });
  }

  openUpdateUserDialog(userId : string) {
    this.ref = this.dialogService.open(UpdateUserComponent, {
      header: 'Update System User',
      width: '40%',
      closable: true,
      data: { userId: userId },
      contentStyle: { "max-height": "600px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((userData) => {
      if (userData) {
        this.getUsersData();      
      }
    });
  }

  confirmDeleteUser(userId: string) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Are you sure you want to delete this user?',
      accept: () => {
        this.deleteUser(userId);
      },
    });
  }

  deleteUser(userId: string) {
    this.usersDataService.delete(userId).subscribe({
      next: (response) => {
        if (response.success) {
          this.messageService.add({ severity: 'info', summary: 'delete', detail: 'User deleted susccesfuly', key: 'br', life: 3000 });
          this.getUsersData();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, key: 'br', life: 3000 });
        }
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong!', key: 'br', life: 3000  });
      },
    });
  }

  getRoleNames(roles: any[]): string {
    return roles?.map(role => role.nameEn).join(', ') || '';
  }

  onReset() {
    this.searchCriteria = { name: '', userName: '', email: '' };
    this.getUsersData();
  }

  // Handle page change event from pagination
  onPageChange(newPage: number) {
    this.pageIndex = newPage;
    this.getUsersData(); // Load new page data from the backend
  }
}
