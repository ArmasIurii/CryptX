import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemingService {

  private currentThemeSubject = new BehaviorSubject<string>('deep-purple');
  currentTheme$ = this.currentThemeSubject.asObservable();

  setTheme(theme: string): void {
    document.body.setAttribute('data-theme', theme);
    this.currentThemeSubject.next(theme);
  }

  setDeepPurpleTheme(): void {
    this.setTheme('deep-purple');
  }

  setIndigoPinkTheme(): void {
    this.setTheme('indigo-pink');
  }

  setPinkTheme(): void {
    this.setTheme('mat-pink');
  }

  setPurpleTheme(): void {
    this.setTheme('mat-purple');
  }
}
