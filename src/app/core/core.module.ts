import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AuthInterceptor } from './../shared/auth.interceptor';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CommentsSortService } from './../shared/services/comments-sorting.service';
import { EntitySortService } from './../shared/services/entity-sorting.service';
import { CheckBrowserService } from './../shared/services/check-browser.service';
import { UploadFileService } from './../shared/services/upload-file.service';
import { EditSiteContentComponent } from './edit-site-content/edit-site-content.component';
import { SearchComponent } from './search/search.component';
import { UploadComponent } from './upload/upload.component';
import { DetailsUploadComponent } from './upload/details-upload/details-upload.component';
import { FormUploadComponent } from './upload/form-upload/form-upload.component';
import { ListUploadComponent } from './upload/list-upload/list-upload.component';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent,
        FooterComponent,
        AboutComponent,
        ContactComponent,
        EditSiteContentComponent,
        SearchComponent,
        UploadComponent,
        DetailsUploadComponent,
        FormUploadComponent,
        ListUploadComponent
    ],
    imports: [
        NgbModule.forRoot(),
        SharedModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        SharedModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent,
        FooterComponent
    ],
    providers: [
        CommentsSortService,
        EntitySortService,
        CheckBrowserService,
        UploadFileService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ]
})
export class CoreModule{

}