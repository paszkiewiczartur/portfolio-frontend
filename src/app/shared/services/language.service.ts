import { Injectable } from '@angular/core';

declare const require;

@Injectable()
export class LanguageService {
  private currentLang: string;
  private userLang: string
    
  constructor() {
    let language = window.navigator.language;
    if(language == 'pl'){
        this.currentLang = 'pl';
        this.userLang = 'pl';
    } else{
        this.currentLang = 'en';
        this.userLang = language;
    }
        console.log(language);
  }

  public getLanguage() {
    return this.currentLang;
  }
  
  public getUserLanguage(){
    return this.userLang;
  }
  
  getRequire(){
        console.log('zmiana', this.currentLang);
    if(this.currentLang == 'en'){
        return require('raw-loader!./../../../locale/messages.en.xlf')
    } else{
        return require('raw-loader!./../../../locale/messages.pl.xlf')
    }
  }
}