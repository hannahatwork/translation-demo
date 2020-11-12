import { BrowserModule } from '@angular/platform-browser';
import {Injectable, LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {TranslateCompiler, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {TranslationService} from './translate.service';

import localeFr from '@angular/common/locales/fr';
import localeEn from '@angular/common/locales/en';
registerLocaleData(localeFr, localeEn);

@Injectable()
export class CustomTranslateLoader implements TranslateLoader  {
  body = JSON.stringify(['title', 'text', 'greeting']);
  contentHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Vary: 'Origin',
  });

  constructor(private httpClient: HttpClient, private customTranslate: TranslationService) {
    customTranslate.languageSubject.subscribe((val: 'en' | 'fr') => {
      this.getTranslation(val);
    });
  }

  getTranslation(lang: string): Observable<any> {
    const apiAddress = `http://localhost:8000/json/1/${lang}`;
    return this.httpClient.get(apiAddress, { headers: this.contentHeader })
      .pipe(
        catchError(() => {
          console.error('Error fetching translations');
          return null;
        })
      );
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatButtonModule,
    MatMenuModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
        deps: [HttpClient, TranslationService]
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      }
    }),
    BrowserAnimationsModule
  ],
  // providers: [TranslationService, { provide: LOCALE_ID, useValue: 'fr-FR' }],
  providers: [TranslationService, { provide: LOCALE_ID, useValue: 'en-EN' }],
  bootstrap: [AppComponent]
})

export class AppModule { }
