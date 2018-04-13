import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as MainActions from './main.actions';
import * as fromMain from './main.reducers';
import { VisitData } from './../model/visit-data.model';
import { Link } from './../model/link.model';
import { IpAddress } from './../model/ip-address.model';
import { SiteContent } from './../model/site-content.model';
import { SearchDraft } from './../model/search-draft.model';
import { DataType } from './../model/data-type.model';
import { LinkType } from './../model/link-type.model';
import { LanguageService } from './../services/language.service';
import { CheckBrowserService } from './../services/check-browser.service'; 

@Injectable()
export class MainEffects {
  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromMain.MainState>,
              private langService: LanguageService,
              private checkBrowserService: CheckBrowserService) {}
    
@Effect()
fetchVisitData = this.actions$
    .ofType(MainActions.FETCH_VISIT_DATA)
    .switchMap((action: MainActions.FetchVisitData) => {
        return this.httpClient.get<IpAddress>('https://ipapi.co/json',{
                observe: 'body',
                responseType: 'json'
            });
    })
    .switchMap(
      (data) => {
        if(typeof(Storage)!=="undefined"){
            let storageValue: {guest_id: number; ip_id: number;} = JSON.parse(localStorage.getItem('arturpaszkiewicz.pl'));
            if(storageValue){
                data.guest_id = +storageValue.guest_id;
                data.id = +storageValue.ip_id;
            }
        }
        data.appLanguage = this.langService.getLanguage();
        data.browserLanguage = this.langService.getUserLanguage();
        const browserInfo = this.checkBrowserService.browserInfo();
        data.browser = browserInfo.browser;
        data.browserVersion = browserInfo.browserVersion.toString();
      return this.httpClient.post<VisitData>('/api/guests/save', data,{
                observe: 'body',
                responseType: 'json'
      });
    })
    .map(
      (data) => {
        if(typeof(Storage)!=="undefined") {
            if(data.guest_id !== 1 && data.ip_id !== 1){
                const visitInfo: {guest_id: number; ip_id: number;} = {guest_id: data.guest_id, ip_id: data.ip_id};
                localStorage.setItem('arturpaszkiewicz.pl', JSON.stringify(visitInfo);            
            } else {
                localStorage.removeItem('arturpaszkiewicz.pl');
            }
        }        
        return {
            type: MainActions.SET_VISIT_DATA,
            payload: data
        };
      }
    );
    
@Effect()
fetchLinks = this.actions$
    .ofType(MainActions.FETCH_LINKS)
    .switchMap((action: MainActions.FetchLinks) => {
        return this.httpClient.get<any>('/api/links/search/findBySiteAndEntity?site=' 
                    + DataType[action.payload.site] + '&entity=' + (+action.payload.entity), {
            observe: 'body',
            responseType: 'json'
        });
    })
    .map(
      (data) => {
        return {
            type: MainActions.SET_LINKS,
            payload: data._embedded.links
        };
      }
    );
    
@Effect({dispatch: false})
sendLinkEntrance = this.actions$
    .ofType(MainActions.SEND_LINK_ENTRANCE)
    .map((action: MainActions.SendLinkEntrance) => {
        return action;
    })
    .withLatestFrom(this.store.select('main'))
    .switchMap(([action, state]) => {
        if(state.links){
            let linkEntrance:{entrance: string; link: string;} = {         
                entrance: '/api/entrances/' +state.entrance_id,
                link: '/api/links/' + state.links[action.payload.toLowerCase()].id
            };
          return this.httpClient.post('/api/linkEntrances', linkEntrance,{
                observe: 'body',
                responseType: 'json'
            })
            .catch(err => {
              return Observable.empty();
            });
        } else {
            return Observable.empty();
        }
    });

@Effect()
  sendVisitLinkEntrance = this.actions$.ofType(MainActions.SET_LINKS)
    .withLatestFrom(this.store.select('main'))
    .switchMap(([action, state]) => {
        let actions = [];
        if(state.waitForVisitData){
            actions.push({
                type: MainActions.WAIT_FOR_VISIT_DATA
            });
        } else {
            actions.push({
                type: MainActions.SEND_LINK_ENTRANCE,
                payload: LinkType[LinkType.VISIT]
            });
        }
      return actions;
    });
    
@Effect()
afterSetVisitData = this.actions$.ofType(MainActions.SET_VISIT_DATA)
    .map((action: MainActions.SetVisitData) => {
        return {
            type: MainActions.SET_DIRTY   
        };
    });

@Effect()
  waitForVisitData = this.actions$.ofType(MainActions.WAIT_FOR_VISIT_DATA)
      .combineLatest(this.actions$.ofType(MainActions.SET_VISIT_DATA))
      .withLatestFrom(this.store.select('main'))
      .map(([actions, state]) => {
        return {
            type: MainActions.SEND_LINK_ENTRANCE,
            payload: LinkType[LinkType.VISIT]      
        };
      });
    
@Effect({dispatch: false})
sendMessage = this.actions$.ofType(MainActions.SEND_MESSAGE)
    .map((action: MainActions.SendMessage) => {
        return action;
    })
    .withLatestFrom(this.store.select('main'))
    .switchMap(([action, state]) => {
        action.payload.entrance = state.entrance_id;
      return this.httpClient.post('/api/messages/save', action.payload,{
                observe: 'body',
                responseType: 'json'
      });
    });
    
@Effect({dispatch: false})
createLink = this.actions$.ofType(MainActions.CREATE_LINK)
    .switchMap((action: MainActions.CreateLink) => {
      return this.httpClient.post('/api/links', action.payload,{
                observe: 'body',
                responseType: 'json'
      });
    });

@Effect({dispatch: false})
deleteLink = this.actions$.ofType(MainActions.DELETE_LINK)
    .switchMap((action: MainActions.DeleteLink) => {
      return this.httpClient.delete('/api/links/' + action.payload, {
                observe: 'body',
                responseType: 'json'
      });
    });

@Effect()
fetchSiteContent = this.actions$.ofType(MainActions.FETCH_SITE_CONTENT)
    .switchMap((action: MainActions.FetchSiteContent) => {
      return this.httpClient.get(
            '/api/siteContent/search/findByPath?siteContentPath=' + action.payload.toLowerCase(), {
                observe: 'body',
                responseType: 'json'
      })
      .catch(err => {
        return Observable.empty();
      });
    })
    .map((data: SiteContent) => {
        return {
            type: MainActions.SET_SITE_CONTENT,
            payload: {
                dataType: data.path,
                siteContent: data
            }
        };  
    });

@Effect({dispatch: false})
storeSiteContent = this.actions$.ofType(MainActions.STORE_SITE_CONTENT)
    .switchMap((action: MainActions.StoreSiteContent) => {
      return this.httpClient.post('/api/siteContent', action.payload,{
                observe: 'body',
                responseType: 'json'
      });
    });

@Effect({dispatch: false})
deleteSiteContent = this.actions$.ofType(MainActions.DELETE_SITE_CONTENT)
    .switchMap((action: MainActions.DeleteSiteContent) => {
      return this.httpClient.delete('/api/siteContent/' + action.payload, {
                observe: 'body',
                responseType: 'json'
      });
    });

@Effect()
fetchSearchData = this.actions$.ofType(MainActions.FETCH_SEARCH_DATA)
    .switchMap((action: MainActions.FetchSearchData) => {
      return this.httpClient.get<Array<SearchDraft>>('/api/search/' + action.payload, {
                observe: 'body',
                responseType: 'json'
      });
    })
    .map((data: Array<SearchDraft>) => {
        return {
            type: MainActions.SET_SEARCH_DATA,
            payload: data
        };  
    });
}