import { Draft } from './../model/draft.model';

export class EntitySortService{
    sort(drafts: Array<Draft>){
        drafts.sort(this.compare);
        for(let i=0; i<drafts.length; i++){
            drafts[i].sequence = i + 1; 
        }
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