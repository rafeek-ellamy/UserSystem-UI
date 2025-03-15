import { Routes } from '@angular/router';
import { HomeComponent } from './@blocks/home/home.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'auth/login',
        pathMatch:'full'
    },
    {
        path:'home',
        component:HomeComponent,
    },
];
