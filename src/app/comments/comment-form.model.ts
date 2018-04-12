export class CommentForm {
    constructor(
        public email: string,
        public nickname: string,
        public content: string,
        public parent: number,
        public site: string,
        public entity: number,
        public entrance: number
    ){}
}