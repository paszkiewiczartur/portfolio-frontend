import { Comment } from './../../comments/comment.model';

export class CommentsSortService{
    comments: Array<Comment>;
    constructor(){}
    
    sortComments(data: Array<Comment>){
        this.comments = data;
        //this.deleteLinks();
        this.makeCommentsArray();
        this.sort();
        return this.comments;
    }
    
    deleteLinks(){
        for(let i=0; i<this.comments.length; i++){
          //  delete this.comments[i]._links;    
        }
    }

    makeCommentsArray(){
        for(let i=0; i<this.comments.length; i++){
            if(!this.comments[i].comments){
                this.comments[i].comments = [];
            }
        }
    }

    sort(){
        let parent: number = null;
        for(let i=this.comments.length-1; i>=0; i--){
            parent = this.comments[i].parent;
            if(parent){
                //minus two to save one loop (last element cannot be a parent)
                for(let j=this.comments.length-2; j>=0; j--){
                    if(this.comments[j].id == parent){
//                        (function(){
                            this.comments[j].comments.unshift(this.comments[i]);                        
//                        })();
                        break;
                    }
                }
            }
        }
        let result: Array<Comment> = [];
        let x;
        for(x in this.comments){
            if(!this.comments[x].parent){
                result.push(this.comments[x]);
            }
        }
        this.comments = result;
    }
}