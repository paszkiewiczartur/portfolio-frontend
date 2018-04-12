import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from './../shared/shared.module';

@NgModule({
    declarations: [
        SigninComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        AuthRoutingModule,
        SharedModule
    ]
})
export class AuthModule{

}