import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as fromMain from './../../shared/store/main.reducers';
import * as MainActions from './../../shared/store/main.actions';
import * as fromApp from './../../store/app.reducers';
import { SiteContent } from './../../shared/model/site-content.model';
import { DataType } from './../../shared/model/data-type.model'; 

@Component({
  selector: 'app-edit-site-content',
  templateUrl: './edit-site-content.component.html',
  styleUrls: ['./edit-site-content.component.css']
})
export class EditSiteContentComponent implements OnInit {
    @Input() dataType: DataType;
    siteContentForm: FormGroup;
    siteContent: SiteContent;
    
    constructor(private store: Store<fromApp.AppState>, private router: Router) { }

    ngOnInit() {
        this.store.select('main')
            .subscribe((mainState: fromMain.State) =>{
                this.siteContent = mainState[this.dataType.toString().toLowerCase()];
                this.initForm();            
            }
        );
    }

    initForm(){
        let descriptionPl: string = null;
        let descriptionEn: string = null;
        if(this.siteContent){
            descriptionPl = this.siteContent.descriptionPl,
            descriptionEn = this.siteContent.descriptionEn
        }
        this.siteContentForm = new FormGroup({
            'descriptionPl': new FormControl(descriptionPl, Validators.required),
            'descriptionEn': new FormControl(descriptionEn, Validators.required)
        });  
    }
    
    onSubmit(){
        let id: number = null;
        let path: string = this.dataType.toString().toLowerCase();
        if(this.siteContent){
            id = this.siteContent.id,
            path = this.siteContent.path
        }
        let siteContent: SiteContent = {
            ...this.siteContentForm.value,
            id: id,
            path: path
        }
        this.store.dispatch(new MainActions.StoreSiteContent(siteContent));
        this.router.navigate(['/']);
    }

    deleteSiteContent(){
        console.log("usuwanie siteContent o id:", this.siteContent.id);
        this.store.dispatch(new MainActions.DeleteSiteContent(this.siteContent.id));
        this.router.navigate(['/']);
    }
}
