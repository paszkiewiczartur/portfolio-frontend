import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromMain from './shared/store/main.reducers';
import * as MainActions from './shared/store/main.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{  
    ipAddress = null;
    storageValue: string = null;
    storagePresence: boolean;
    
    constructor(private httpClient: HttpClient, private store: Store<fromMain.MainState>){}

    ngOnInit(){
//        this.isStorage();
        this.store.select('main').dispatch(new MainActions.FetchVisitData());
    }

    isStorage(){
        if(typeof(Storage)!=="undefined"){
            this.storagePresence = true;
        } else {
            this.storagePresence = false;
        }
    }
    
    getIP(){
        this.httpClient.get('https://ipapi.co/json',{
            observe: 'body',
            responseType: 'json'
            })
            .subscribe(
                (response) => {
                    console.log(response);
                    this.ipAddress = response;
                }
            );
    }

    readStorage(){
        if(this.storagePresence) {
            let storageValue = localStorage.getItem('devap');
            console.log(storageValue);
            this.storageValue = storageValue;
        }
    }

    addFromStorage(){
        if(this.storagePresence){
            let storageValue: string = localStorage.getItem('devap');
            let percentIndex: number = storageValue.indexOf('%');
            let guest: string = storageValue.substr(0, percentIndex);
            let ipId: string = storageValue.substr(percentIndex + 1, storageValue.length);
            this.ipAddress.guest_id = +guest;
            this.ipAddress.id = +ipId;
        }
    }

    sendIP(){
        delete this.ipAddress.asn;
        delete this.ipAddress.country
        delete this.ipAddress.country_calling_code;
        delete this.ipAddress.currency;
        delete this.ipAddress.region_code;
        delete this.ipAddress.utc_offset;
        console.log(this.ipAddress);
//        this.httpClient.post('/guest', this.ipAddress)
        this.httpClient.post('http://localhost:8082/api/guest', this.ipAddress)
            .subscribe(
                (response) => {
                    console.log(response);
                    this.ipAddress = response;
                }
            );
    }

    changeIP(){
        this.ipAddress.ip = "Test";
    }
    
    changeGuest(){
        this.ipAddress.guest_id = +17;
    }
    
    deleteGuest(){
        delete this.ipAddress.guest_id;
    }

    saveIP(){
        if(this.storagePresence) {
            localStorage.setItem('devap', this.ipAddress.guest_id + '%' + this.ipAddress.ip_id);
        }        
    }
    
    removeIP(){
        if(this.storagePresence){
            localStorage.removeItem('devap');
        }
    }
    
    cookies(){
		  let pairs = document.cookie.split(";");
		  let cookies = {};
		  for (let i=0; i<pairs.length; i++){
		    let pair = pairs[i].split("=");
//		    cookies[(pair[0]+'').trim()] = unescape(pair[1]);
		    cookies[(pair[0]+'').trim()] = (pair[1]);
		  }
		  console.log(cookies);
          
        this.sendTag('hibernate')
        .subscribe(
            (response) => {
                console.log(response);
            }
        );    
    }
    
    sendTag(value: string) {
        let message: {value: string, amount:number} = {value: value, amount: 2};
        
      return this.httpClient.post('/api/tags', message);
  }
}
