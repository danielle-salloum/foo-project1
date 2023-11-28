// translation.service.ts
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly LANG_KEY = 'selectedLanguage';

  constructor(private translate: TranslateService) {}

  init(): void {
    const savedLanguage = localStorage.getItem(this.LANG_KEY);
    const defaultLanguage = savedLanguage || 'en';
    this.translate.setDefaultLang(defaultLanguage);
    this.translate.use(defaultLanguage);
    this.setLanguageDirection(defaultLanguage);
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem(this.LANG_KEY, lang);
    this.setLanguageDirection(lang);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }

  private setLanguageDirection(lang: string): void {
    const isRtl = lang === 'ar';
    document.getElementsByTagName('html')[0].setAttribute('dir', isRtl ? 'rtl' : 'ltr');
  }
}
