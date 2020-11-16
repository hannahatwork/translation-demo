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

// i18n-text: Also need to `ng add angular-localize` to set locale.
import localeEn from '@angular/common/locales/en';
// i18n-text: This will need to be dynamically set.
registerLocaleData(localeEn);

// i18n-text: ngx-translate allows you to define a custom loader; this loader gets i18n files via API call.
@Injectable()
export class CustomTranslateLoader implements TranslateLoader  {
  body = JSON.stringify(['title', 'text', 'greeting']);
  contentHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Vary: 'Origin',
  });

  constructor(private httpClient: HttpClient, private customTranslate: TranslationService) {
    // i18n-text: This subscription is used to keep track of which language the user has selected. It is probably
    // not necessary in a production application, where the language will most likely be set on the practice
    // level, or extrapolated from the practice-level locale setting.
    customTranslate.languageSubject.subscribe((val: 'en' | 'fr') => {
      this.getTranslation(val);
    });
  }

  // i18n-text: Here we make the API call to fetch the raw JSON translation files that ngx-translate uses.
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
    // i18n-text: TranslateModule implements ngx-translate. The loader provides the translation files
    // and the compiler is a sort of middleware that implements pluralization and gender using the
    // ngx-translate-messageformat-compiler library.
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
  // i18n: The locale should be set dynamically when the app loads based off of the practice settings. Try replacing
  // 'en-EN' with 'fr-FR' to see how the locale affects datePipe and currencyPipe.
  providers: [TranslationService, { provide: LOCALE_ID, useValue: 'en-EN' }],
  bootstrap: [AppComponent]
})

export class AppModule { }
