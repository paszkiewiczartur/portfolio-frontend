export class Book{
    constructor (
        public id: number,
        public name: string,
        public path: string,
        public author: string,
        public descriptionPl: string,
        public descriptionEn: string,
        public rating: number,
        public imagePath: string,
        public link: string,
        public pages: number,
        public haveRead: string,
        public posted: string,
        public lastUpdate: string,
        public commentsAvailable: boolean
    ){    }
} 