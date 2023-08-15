import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlDomain'
})
export class UrlDomainPipe implements PipeTransform {
  
  transform(value: string): string {
    if (!value) return '';

    const url = new URL(value);
    return url.hostname;
  }
}
