import { Action } from '@ngrx/store';

import { VisitData } from './../model/visit-data.model';
import { Link } from './../model/link.model';
import { Message } from './../model/message.model';
import { SiteContent } from './../model/site-content.model';
import { SearchDraft } from './../model/search-draft.model';

export const FETCH_VISIT_DATA = 'FETCH_VISIT_DATA';
export const SET_VISIT_DATA = 'SET_VISIT_DATA';
export const SEND_LINK_ENTRANCE = 'SEND_LINK_ENTRANCE';
export const FETCH_LINKS = 'FETCH_LINKS';
export const SET_LINKS = 'SET_LINKS';
export const CREATE_LINK = 'CREATE_LINK';
export const DELETE_LINK = 'DELETE_LINK';
export const WAIT_FOR_VISIT_DATA = 'WAIT_FOR_VISIT_DATA';
export const SET_DIRTY = 'SET_DIRTY';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const FETCH_SITE_CONTENT = 'FETCH_SITE_CONTENT';
export const SET_SITE_CONTENT = 'SET_SITE_CONTENT';
export const STORE_SITE_CONTENT = 'STORE_SITE_CONTENT';
export const DELETE_SITE_CONTENT = 'DELETE_SITE_CONTENT';
export const FETCH_SEARCH_DATA = 'FETCH_SEARCH_DATA';
export const SET_SEARCH_DATA = 'SET_SEARCH_DATA';

export class FetchVisitData implements Action {
    readonly type = FETCH_VISIT_DATA;
}

export class SetVisitData implements Action {
    readonly type = SET_VISIT_DATA;
    constructor(public payload: VisitData){}
}

export class SendLinkEntrance implements Action {
    readonly type = SEND_LINK_ENTRANCE;
    constructor(public payload: string){}
}

export class FetchLinks implements Action {
    readonly type = FETCH_LINKS;
    constructor(public payload: {
        site: string;
        entity: number;
    }){}
}

export class SetLinks implements Action {
    readonly type = SET_LINKS;
    constructor(public payload: Array<Link>){}
}

export class CreateLink implements Action {
    readonly type = CREATE_LINK;
    constructor(public payload: {
        id: number;
        site: string;
        entity: number;
        linkType: string;
    }){}
}

export class DeleteLink implements Action {
    readonly type = DELETE_LINK;
    constructor(public payload: number){}
}

export class WaitForVisitData implements Action {
    readonly type= WAIT_FOR_VISIT_DATA;
}

export class SetDirty implements Action {
    readonly type = SET_DIRTY;
}

export class SendMessage implements Action {
    readonly type = SEND_MESSAGE;
    constructor(public payload: Message){}
}

export class FetchSiteContent implements Action {
    readonly type = FETCH_SITE_CONTENT;
    constructor(public payload: string){}
}

export class SetSiteContent implements Action {
    readonly type = SET_SITE_CONTENT;
    constructor(public payload: {dataType: string; siteContent: SiteContent}){}
}

export class StoreSiteContent implements Action {
    readonly type = STORE_SITE_CONTENT;
    constructor(public payload: SiteContent){}
}

export class DeleteSiteContent implements Action {
    readonly type = DELETE_SITE_CONTENT;
    constructor(public payload: number){}
}

export class FetchSearchData implements Action {
    readonly type = FETCH_SEARCH_DATA;
    constructor(public payload: string){}
}

export class SetSearchData implements Action {
    readonly type = SET_SEARCH_DATA;
    constructor(public payload: Array<SearchDraft>){}
}

export type MainActions = 
    FetchVisitData|
    SetVisitData |
    SendLinkEntrance|
    FetchLinks | 
    SetLinks |
    CreateLink |
    DeleteLink |
    WaitForVisitData |
    SetDirty |
    SendMessage |
    FetchSiteContent |
    SetSiteContent |
    StoreSiteContent |
    DeleteSiteContent |
    FetchSearchData |
    SetSearchData;