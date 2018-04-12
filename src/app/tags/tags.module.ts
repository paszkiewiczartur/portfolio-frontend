import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//import { BooksRoutingModule } from './books-routing.module';
import { TagsComponent } from './tags.component';
import { TagComponent } from './tag/tag.component';
import { TagsStartComponent } from './tags-start/tags-start.component';
import { TagEditComponent } from './tag-edit/tag-edit.component';
import { TagsRoutingModule } from './tags-routing.module';
import { SharedModule } from './../shared/shared.module';
@NgModule({
    declarations: [
        TagsComponent,
        TagComponent,
        TagsStartComponent,
        TagEditComponent
    ],
    imports: [
        //FormsModule,
        SharedModule,
        CommonModule,
        //BooksRoutingModule,
        ReactiveFormsModule,
        TagsRoutingModule
    ],
    exports: [
        TagsStartComponent
    ]
})
export class TagsModule{

}