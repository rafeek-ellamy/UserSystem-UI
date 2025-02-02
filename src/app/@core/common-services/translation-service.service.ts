import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  defaultLang = 'en';
  private renderer: Renderer2;

  constructor(
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lng') || this.defaultLang;
      this.setLanguage(savedLang);
    }
  }

  setLanguage(lang: string) {
    this.translateService.use(lang);
    this.setDirection(lang);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lng', lang);
    }
  }

  // connect direction with language
  private setDirection(lang: string) {
    if (lang === 'ar') {
      this.renderer.addClass(document.body, 'rtl');
    } else {
      this.renderer.removeClass(document.body, 'rtl');
    }
  }
}
