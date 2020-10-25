import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'formatDate'})
export class FormatDatePipe implements PipeTransform {
  transform(value: any, format: string): string {
    if( value ) return value.format(format);
	return "";
  }
}
