import { Pipe, PipeTransform } from '@angular/core';
import { BookData } from '../data.model';

export class ValueArrayModule { }

@Pipe({
  name: 'valueArray',
  standalone: true 
})
export class ValueArrayPipe implements PipeTransform {

  // El parametro object representa, los valores de las propiedades o indice
// transform(objects : any = []) {
 // return Object.values(value) as BookData[];
 transform(value: object): BookData[] {
  if (!value) {
    return [];
  }
  // Cast the result to BookData[]
  return Object.values(value) as BookData[];
}
  }