import { Injectable } from '@angular/core';
import { fromEvent, share } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  documentClick$ = fromEvent(document, 'click').pipe(share());
}