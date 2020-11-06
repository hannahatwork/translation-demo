import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'translation-demo';

  constructor(private translate: TranslateService){
    translate.setDefaultLang('en');

  }
}

// covetrus.com/translate/MF1/en.json - 3000  - Global one pass to each Micro UI when they boot
// 100 keys give me those - api will parse -
// MF1 - 100 properties - 3000 //server microservice
// MF1 - response - cache inside it -
// Here we get the profile - user making http/ container passes it
// set language accoridng to the profile
// Date and currency - Angular pipes - which takes care ..
