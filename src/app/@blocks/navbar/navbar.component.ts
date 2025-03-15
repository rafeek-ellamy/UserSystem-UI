import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar, MenubarModule } from 'primeng/menubar';
import { TranslationService as CustomTranslationService } from '../../@core/common-services/translation-service.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule, ButtonModule, MenuModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  //injecting
  customTranslate = inject(CustomTranslationService);
  translate = inject(TranslateService);
  router = inject(Router);

  currentLang: string = 'en';

  constructor() {
    this.currentLang = localStorage.getItem('selectedLanguage') || 'en';
  }

  ngOnInit() {

  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.customTranslate.setLanguage(this.currentLang);
    localStorage.setItem('selectedLanguage', this.currentLang);
  }
  changeLanguage(lang: string) {
    this.customTranslate.setLanguage(lang);  // Change language
  }
}
