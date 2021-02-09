import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterUniquePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'filterUnique',
  pure: false
})
export class FilterUniquePipe implements PipeTransform {
  transform(value: Array<any>, field:string): Array<any> {
    if (value) {
      const groupedObj = value.reduce((prev, cur) =>{
        if(!prev[cur[field]]) {
          prev[cur[field]] = [cur]
        } else{
          prev[cur[field]].push(cur);
        }

        return prev;
      }, {});

      return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
    } else {
      return null;
    }
  }

}
