// font-size.service.ts
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
  
export class FontService {
  
  private baseFontSizeKey = 'userFontSize';
  private baseFontSize: number;

  constructor(private router: Router) {
    // Try to get the font size from localStorage on service initialization
    const storedFontSize = localStorage.getItem(this.baseFontSizeKey);
    this.baseFontSize = storedFontSize ? +storedFontSize : 16;
    this.updateFontSize();

    // Subscribe to route changes to update font size on navigation
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateFontSize();
      }
    });
  }

  getFontSize(): number {
    return this.baseFontSize;
  }

  increaseFontSize(increment: number): void {
    this.baseFontSize += increment;
    this.updateFontSize();
    this.saveFontSize();
  }
  
  decreaseFontSize(decrease: number): void {
    this.baseFontSize -= decrease;
    this.updateFontSize();
    this.saveFontSize();
  }

  private updateFontSize(): void {
    const newFontSize = `${this.baseFontSize}px`;
    document.documentElement.style.fontSize = newFontSize;

    // Update the font size for the <a> tags
    const aTags = document.querySelectorAll('a');
    aTags.forEach((a: HTMLAnchorElement) => {
      a.style.fontSize = newFontSize;
    });
  }

  private saveFontSize(): void {
    // Save the current font size to localStorage
    localStorage.setItem(this.baseFontSizeKey, this.baseFontSize.toString());
  }
}
