import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
// i18n-text: (Dupe of comment in app.module) This subscription is used to keep track of which language
// the user has selected. It is probably not necessary in a production application, where the language
// will most likely be set on the practice level, or extrapolated from the practice-level locale setting.
export class TranslationService {
  public languageSubject = new Subject();

  changeLang(lang: 'en' | 'fr') {
    this.languageSubject.next(lang);
  }

  constructor() { }
}
