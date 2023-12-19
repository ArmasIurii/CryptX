import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemingService {

  private currentThemeSubject = new BehaviorSubject<string>('deep-purple');
  currentTheme$ = this.currentThemeSubject.asObservable();

  isDarkTheme$ = new BehaviorSubject(false)

  setTheme(theme: string): void {
    (this.isDarkTheme$.value) ? document.body.setAttribute('data-theme', `${theme}-dark`) : document.body.setAttribute('data-theme', theme)
    this.currentThemeSubject.next(theme);
  }

  getCurrentTheme(): string {
    let currentTheme = '';
    this.currentTheme$.subscribe(theme => {
      currentTheme = theme;
    });
    return currentTheme;
  }
}
