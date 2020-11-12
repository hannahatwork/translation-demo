import {Component, OnInit, ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {trigger} from '@angular/animations';
import {TranslationService} from "./translate.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // ng add @angular/localize to use locale
  title = 'translation-demo';
  lang = 'en';
  currencyVal = 'USD';
  timezoneVal = 'GMT-5';

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private translate: TranslateService, private customTranslate: TranslationService){
    translate.setDefaultLang('en');
    translate.addLangs(['en', 'fr']);
    translate.use('en');
  }

  setLang(lang) {
    this.lang = lang;
    this.translate.use(lang);
    this.customTranslate.changeLang(lang);
  }

  setCurrency(currency) {
    // use ISO 4217 codes
    console.log(`Setting currency to ${currency}`);
    this.currencyVal = currency;
  }

  setTimezone(timezone) {
    console.log(`Setting timezone to ${timezone}`);
    this.timezoneVal = timezone;
  }

  getLang() {
    return this.lang;
  }

  ngOnInit(){
    this.getLang();
  }

  langClick(lang: 'fr' | 'en') {
    this.setLang(lang);
  }

  currencyClick(currency: 'EUR' | 'USD') {
    this.setCurrency(currency);
  }

  timezoneClick(timezone: 'GMT-5' | 'GMT-7' | 'GMT+1') {
    this.setTimezone(timezone);
  }
}

// covetrus.com/translate/MF1/en.json - 3000  - Global one pass to each Micro UI when they boot
// 100 keys give me those - api will parse -
// MF1 - 100 properties - 3000 //server microservice
// MF1 - response - cache inside it -
// Here we get the profile - user making http/ container passes it
// set language accoridng to the profile
// Date and currency - Angular pipes - which takes care ..
