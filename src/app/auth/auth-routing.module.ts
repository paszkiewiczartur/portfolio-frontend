import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './../core/home/home.component';

const authRoutes: Routes = [
    { path: 'signin', component: SigninComponent}
];

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})
export class AuthRoutingModule{

}