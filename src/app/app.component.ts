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
  title = 'translation-demo';
  lang = 'en';

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private translate: TranslateService, private customTranslate: TranslationService){
    translate.setDefaultLang('en');
    translate.addLangs(['en', 'fr']);
    translate.use('en');
  }

  setLang(lang) {
    console.log(`Setting lang to ${lang}`);
    this.lang = lang;
    this.translate.use(lang);
    this.customTranslate.changeLang(lang);
  }

  getLang() {
    return this.lang;
  }

  ngOnInit(){
    this.getLang();
  }

  click(lang: 'fr' | 'en') {
    this.setLang(lang);
  }
}

// covetrus.com/translate/MF1/en.json - 3000  - Global one pass to each Micro UI when they boot
// 100 keys give me those - api will parse -
// MF1 - 100 properties - 3000 //server microservice
// MF1 - response - cache inside it -
// Here we get the profile - user making http/ container passes it
// set language accoridng to the profile
// Date and currency - Angular pipes - which takes care ..
