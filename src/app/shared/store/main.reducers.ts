import * as MainActions from './main.actions';
import { Link } from './../model/link.model';
import { SiteContent } from './../model/site-content.model';
import { SearchDraft } from './../model/search-draft.model';
import { LinkType } from './../model/link-type.model';
import { DataType } from './../model/data-type.model';

export interface MainState {
  main: State
}

export interface State {
  ip_id: number;
  guest_id: number;
  entrance_id: number;
  searched: Array<SearchDraft>;
  links: {
    visit: Link;
    website: Link;
    download: Link;
    github: Link;
  };
  waitForVisitData: boolean;
  contact: SiteContent;
  about: SiteContent;
  home: SiteContent;
}

const initialState: State = {
  searched: null,
  ip_id: null,
  guest_id: null,
  entrance_id: null,
  links: {
    visit: null,
    website: null,
    download: null,
    github: null
  },
  waitForVisitData: true,
  contact: null,
  about: null,
  home: null
}

export function mainReducer(state = initialState, action: MainActions.MainActions) {
  switch (action.type) {
    case (MainActions.SET_VISIT_DATA):
      return {
        ...state,
        ip_id: action.payload.ip_id,
        guest_id: action.payload.guest_id,
        entrance_id: action.payload.entrance_id
      };
    case(MainActions.SET_LINKS):
        let links = null;
        if(action.payload.length > 0){
            let visit: Link = null;
            let website: Link = null;
            let download: Link = null;
            let github: Link = null;
            for(let x in action.payload){
                if(action.payload[x].linkType.toString() === LinkType[LinkType.VISIT]){
                    visit = action.payload[x];
                }
                if(action.payload[x].linkType.toString() === LinkType[LinkType.WEBSITE])
                    website = action.payload[x];
                if(action.payload[x].linkType.toString() === LinkType[LinkType.DOWNLOAD])
                    download = action.payload[x];            
                if(action.payload[x].linkType.toString() === LinkType[LinkType.GITHUB])
                    github = action.payload[x];            
            }
            links = {
                visit: visit,
                website: website,
                download: download,
                github: github
            }
        } else {
            console.log("Warning! Empty links array!");
        }
      return {
        ...state,
        links: links
      };
    case (MainActions.SET_DIRTY):
      return {
        ...state,
        waitForVisitData: false
      };
    case (MainActions.SET_SITE_CONTENT):
        if(action.payload.dataType === DataType[DataType.About].toLowerCase()){
            return {
                ...state,
                about: action.payload.siteContent
            };        
        } else if(action.payload.dataType === DataType[DataType.Contact].toLowerCase()){
            return {
                ...state,
                contact: action.payload.siteContent
            };      
        } else if(action.payload.dataType === DataType[DataType.Home].toLowerCase()){
            return {
                ...state,
                home: action.payload.siteContent
            };      
        } else {
            return state;
        }
    case (MainActions.SET_SEARCH_DATA):
      return {
        ...state,
        searched: action.payload
      };
    default:
      return state;
  }
}
