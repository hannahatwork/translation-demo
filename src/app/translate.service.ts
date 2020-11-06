import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  public languageSubject = new Subject();

  changeLang(lang: 'en' | 'fr') {
    this.languageSubject.next(lang);
  }

  constructor() { }
}
