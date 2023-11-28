// translation-loader.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationLoaderService implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    const translationPath = `../../../assets/i18n/${lang}.json`; // Adjust the path accordingly
    return this.http.get(translationPath);
  }
}
