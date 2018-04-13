import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromApp from './../../store/app.reducers';
import * as fromAuth from './../../auth/store/auth.reducers';
import * as fromMain from './../../shared/store/main.reducers';
import * as MainActions from './../../shared/store/main.actions';
import { LanguageService } from './../../shared/services/language.service';
import { DataType } from './../../shared/model/data-type.model'; 
import { LinkType } from './../../shared/model/link-type.model'; 

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
    authState: Observable<fromAuth.State>;
    mainState: Observable<fromMain.State>;
    aboutEdit: boolean = false;

    constructor(private store: Store<fromApp.AppState>, private languageService: LanguageService) { }

    ngOnInit() {
        this.store.dispatch(new MainActions.FetchSiteContent('About'));
        this.sendVisitLinkEntrance();
        this.authState = this.store.select('auth');
        this.mainState = this.store.select('main');
    }
 
     sendVisitLinkEntrance(){
        const linkRequestType = {
            site: DataType.About.toString(),
            entity: 1
        };
        this.store.dispatch(new MainActions.FetchLinks(linkRequestType));        
    }

    isPolish(){
        if(this.languageService.getLanguage() === 'pl'){
            return true;
        }
        return false;
    }
    
    download(){
        const linkType: string = LinkType[LinkType.DOWNLOAD];
        this.store.dispatch(new MainActions.SendLinkEntrance(linkType));
    }

    github(){
        const linkType: string = LinkType[LinkType.GITHUB];
        this.store.dispatch(new MainActions.SendLinkEntrance(linkType));
    }

}
