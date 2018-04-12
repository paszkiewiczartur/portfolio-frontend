import { PipeTransform, Pipe } from '@angular/core';

import { Draft } from './../model/draft.model';

@Pipe({
    name: 'sortEntity',
    pure: false
})
export class SortPipe implements PipeTransform{
  constructor(){}

  transform(data: Array<Draft>) {
    let result: Array<Draft> = data.slice();
    result.sort(this.compare);
    
    return result;
  }

    private compare(a: Draft, b: Draft) {
        if(a.sequence && b.sequence){
            if (a.sequence < b.sequence)
                return -1;
            if (a.sequence > b.sequence)
                return 1;
        } else if(a.sequence){
            return -1;
        } else if(b.sequence){
            return 1;
        }
        return 0;
    }

}