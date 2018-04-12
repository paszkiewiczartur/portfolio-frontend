export class Project{
    constructor (
        public id: number,
        public bookPath: string,
        public descriptionPl: string,
        public descriptionEn: string,
        public rating: number,
        public imagePath: string,
        public link: string,
        public pages: number,
        public haveRead: Date,
        public posted: Date,
        public lastUpdate: Date,
        public commentsAvailable: boolean
    ){    }
} 