import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DropdownDirective } from './dropdown.directive';
import { TextareaResizeDirective } from './textarea-resize.directive';
import { EditLinksComponent } from './edit-links/edit-links.component';
import { SafePipe } from './pipes/safe.pipe';
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        EditLinksComponent,
        DropdownDirective,
        TextareaResizeDirective,
        SafePipe,
        SortPipe
    ],
    exports: [
        EditLinksComponent,
        CommonModule,
        DropdownDirective,
        TextareaResizeDirective,
        SafePipe,
        SortPipe
    ]
})
export class SharedModule{

}