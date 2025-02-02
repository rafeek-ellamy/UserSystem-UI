import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar, MenubarModule } from 'primeng/menubar';
import { UserSessionService } from '../../@core/data-services/auth/user-session.service';
import { TranslationService as CustomTranslationService } from '../../@core/common-services/translation-service.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  //injecting
  customTranslate = inject(CustomTranslationService);
  translate = inject(TranslateService);
  userSession = inject(UserSessionService);
  router = inject(Router);

  items: MenuItem[] = [];

  ngOnInit() {
    this.setMenuItems();

    // Subscribe to language change to update menu items dynamically
    this.translate.onLangChange.subscribe(() => {
      this.setMenuItems();
    });
  }

  setMenuItems() {
    this.items = [
      { label: this.translate.instant('NAV.HOME'), icon: 'pi pi-home', command: () => this.router.navigate(['/home']) },
      { label: this.translate.instant('NAV.USERS'), icon: 'pi pi-user', command: () => this.router.navigate(['/users-list']) },
      {
        label: this.translate.instant('NAV.LANGUAGE'), icon: 'pi pi-globe',
        items: [
          { label: 'English', command: () => this.changeLanguage('en') },
          { label: 'العربية', command: () => this.changeLanguage('ar') }
        ]
      },
      { label: this.translate.instant('NAV.LOGOUT'), icon: 'pi pi-sign-out', command: () => this.userSession.logout(),  },
    ];
  }

  changeLanguage(lang: string) {
    this.customTranslate.setLanguage(lang);  // Change language
  }
}
