import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemingService {

  private currentThemeSubject = new BehaviorSubject<string>('default');
  currentTheme$ = this.currentThemeSubject.asObservable();

  setTheme(theme: string): void {
    document.body.setAttribute('data-theme', theme);
    this.currentThemeSubject.next(theme);
  }

  setDefaultTheme(): void {
    this.setTheme('default');
  }

  setDarkTheme(): void {
    this.setTheme('dark');
  }

  setCustomTheme(): void {
    this.setTheme('custom');
  }
}
