import {Component, OnInit, ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {TranslationService} from "./translate.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // i18n: These allow things like language and currency to be set via dropdown in the UI. This won't
  // need to be implemented when we're gleaning those settings from the locale.
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
