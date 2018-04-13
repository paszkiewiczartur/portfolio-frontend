import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    typewriterText: string;
    homeHeader: string = "";
    authState: Observable<fromAuth.State>;
    mainState: Observable<fromMain.State>;
    homeEdit: boolean = false;
    @ViewChild('hiddenHeader') hiddenHeaderTranslation : ElementRef;

    constructor(private store: Store<fromApp.AppState>, private languageService: LanguageService) { }

    ngOnInit() {
        this.store.dispatch(new MainActions.FetchSiteContent('Home'));
        this.sendContactVisitEntrance();
        this.authState = this.store.select('auth');
        this.mainState = this.store.select('main');
        this.typewriterText = this.hiddenHeaderTranslation.nativeElement.textContent;
        this.typingCallback(this);
    }
    
     sendContactVisitEntrance(){
        const linkRequestType = {
            site: DataType.Home.toString(),
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

    typingCallback(that) {
        let totalLength = that.typewriterText.length;
        let currentLength = that.homeHeader.length;
        if (currentLength < totalLength) {
            that.homeHeader += that.typewriterText[currentLength];
        }
        setTimeout(that.typingCallback, 50, that);
    }

}
