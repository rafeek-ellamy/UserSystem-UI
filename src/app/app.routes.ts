import { Routes } from '@angular/router';
import { NavbarComponent } from './@blocks/navbar/navbar.component';
import { RegisterUserComponent } from './modules/auth/register-user/register-user.component';
import { AuthComponent } from './modules/auth/auth.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoggedInGuard } from './shared/guards/logged-in.guard';
import { UsersComponent } from './modules/users/users.component';
import { HomeComponent } from './@blocks/home/home.component';
import { UnauthorizedComponent } from './modules/auth/unauthorized/unauthorized.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'auth/login',
        pathMatch:'full'
    },
    {
        path:'home',
        component:HomeComponent,
        canActivate: [AuthGuard],
        data: { role: 'SystemUser,Admin,SuperAdmin' }
    },
    {
        path:'users-list',
        component:UsersComponent,
        canActivate: [AuthGuard],
        data: { role: 'Admin,SuperAdmin' }
    },
    {
        path:'auth',
        component:AuthComponent,
        children:[
            {
                path:'register-user',
                component:RegisterUserComponent,
                canActivate: [LoggedInGuard] 
            },
            {
                path:'login',
                component:LoginComponent,
                canActivate: [LoggedInGuard] 
            }
        ]
    },
    {
        path:'unauthorized',
        component:UnauthorizedComponent,
    },
];
