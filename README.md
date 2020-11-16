# Internationalization Demo

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
cd into `intl-server-2` and run `node app.ts` to run the translation microservice that serves the API used by the Angular app.  

## About this application

This app implements basic internationalization, consisting of: translation, currency formatting, and date/time formatting. 
Code has been commented with `i18n` (general), `i18n-text`, `i18n-money`, and `i18n-date` for more info.

### Tools used:
- ngx-translate
- ngx-translate-messageformat-compiler
- datePipe (angular)
- currencyPipe (angular)
- angular-localize

## About the server

`intl-server-2` is a small node microservice. In that directory you'll find the translation JSON files. They follow `ngx-translate-messageformat-compiler`
specifications, which itself implements messageformat (https://messageformat.github.io/messageformat/page-guide).
