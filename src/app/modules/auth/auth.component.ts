import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TranslationService } from '../../@core/common-services/translation-service.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet,ButtonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  translate = inject(TranslationService);
  
  switchLanguage(language: string) {
    this.translate.setLanguage(language);
  }
}
