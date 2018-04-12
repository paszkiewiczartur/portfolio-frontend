import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromApp from './../../store/app.reducers';
import * as fromAuth from './../../auth/store/auth.reducers';
import * as fromMain from './../../shared/store/main.reducers';
import * as MainActions from './../../shared/store/main.actions';
import { Message } from './../../shared/model/message.model';
import { LanguageService } from './../../shared/services/language.service';
import { DataType } from './../../shared/model/data-type.model'; 
import { LinkType } from './../../shared/model/link-type.model'; 

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    @ViewChild('f') messageForm: NgForm;
    authState: Observable<fromAuth.State>;
    mainState: Observable<fromMain.State>;
    messageSent: boolean = false;
    contactEdit: boolean = false;
    
    constructor(private store: Store<fromApp.AppState>, private languageService: LanguageService) { }

    ngOnInit() {
        this.store.dispatch(new MainActions.FetchSiteContent('Contact'));
        this.sendContactVisitEntrance();
        this.authState = this.store.select('auth');
        this.mainState = this.store.select('main');
    }
    
    sendContactVisitEntrance(){
        const linkRequestType = {
            site: DataType.Contact.toString(),
            entity: 1
        };
        console.log("inside contact.component");
        console.log(linkRequestType);
        this.store.dispatch(new MainActions.FetchLinks(linkRequestType));        
    }
    
    onSubmit(form: NgForm){
        let email = form.value.email;
        if(!email)
            email = 'empty';
        const credentials = form.value.credentials;
        const content = form.value.content;
        this.store.dispatch(new MainActions.SendMessage(new Message(email, credentials, content, null)));
        const linkType: string = LinkType[LinkType.WEBSITE];
        this.store.dispatch(new MainActions.SendLinkEntrance(linkType));
        this.messageSent = true;
        let that = this;
        setTimeout(function(){
            that.messageSent = false;
            that.messageForm.reset();
        }, 2000);
    }
    
    isPolish(){
        if(this.languageService.getLanguage() === 'pl'){
            return true;
        }
        return false;
    }
}
