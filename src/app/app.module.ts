import { BrowserModule } from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class CustomTranslateLoader implements TranslateLoader  {
  body = JSON.stringify(['welcome', 'locationInfo']);
  contentHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    body: this.body,
  });

  constructor(private httpClient: HttpClient) {}
  getTranslation(lang: string): Observable<any> {
    const apiAddress = `http://localhost:8000/json/en`;
    return this.httpClient.get(apiAddress, { headers: this.contentHeader })
      .pipe(
        catchError(() => {
          console.error('Error fetching translations');
          return null;
        })
      );
  }
}

// tslint:disable-next-line:typedef
export function HttpLoaderFactory(http: HttpClient) {
  // return new TranslateHttpLoader(http);
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        // useFactory: HttpLoaderFactory,
        useClass: CustomTranslateLoader,
        deps: [HttpClient]
      }
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
