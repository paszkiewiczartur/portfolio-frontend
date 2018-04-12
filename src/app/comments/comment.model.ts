export class Comment{
    constructor (
        public id: number,
        public posted: string,
        public content: string,
        public nickname: string,
        public parent: number,
        public comments: Array<Comment>,
        public entityPath: string,
        public entityName: string
    ){    }
} 