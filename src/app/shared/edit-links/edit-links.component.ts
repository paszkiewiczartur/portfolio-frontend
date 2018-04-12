import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as MainActions from './../store/main.actions';
import * as fromMain from './../store/main.reducers';
import { Link } from './../model/link.model';
import { DataType } from './../model/data-type.model'; 

@Component({
  selector: 'app-edit-links',
  templateUrl: './edit-links.component.html',
  styleUrls: ['./edit-links.component.css']
})
export class EditLinksComponent implements OnInit {
    @Input() dataType: DataType;
    @Input() entityId: number;
    links: {
        visit: Link;
        website: Link;
        download: Link;
    };
    
    constructor(private store: Store<fromMain.MainState>, private router: Router) { }

    ngOnInit() {
        this.store.select('main').subscribe(
            (mainState: fromMain.State) => {
                this.links = mainState.links;
            }
        );
    }

    createLink(linkType: string){
        let link = {
            id: null,
            site: this.dataType.toString(),
            entity: this.entityId,
            linkType: linkType
        }
        console.log("before dispatch CreateLink");
        console.log(link);
        this.store.dispatch(new MainActions.CreateLink(link));
        let path:string = '/';
        if(!(this.dataType.toString() === 'Contact' 
        || this.dataType.toString() === 'About'
        || this.dataType.toString() === 'Home'
        || this.dataType.toString() === 'Signin')){
            path += this.dataType.toString().toLowerCase() + 's';
        }
        this.router.navigate([ path ]);            
    }

    deleteLink(id: number){
        this.store.dispatch(new MainActions.DeleteLink(id));
        let path:string = '/';
        if(!(this.dataType.toString() === 'Contact' 
        || this.dataType.toString() === 'About'
        || this.dataType.toString() === 'Home'
        || this.dataType.toString() === 'Signin')){
            path += this.dataType.toString().toLowerCase() + 's';
        }
        this.router.navigate([ path ]);            
    }
}
