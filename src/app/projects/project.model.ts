export class Project {
    constructor(
        public id: number,
        public name: string,
        public path: string,
        public descriptionPl: string,
        public descriptionEn: string,
        public imagePath: string,
        public githubLink: string,
        public link: string,
        public linkToDownload: string,
        public lengthPl: string,
        public lengthEn: string,
        public posted: string,
        public lastUpdate: string,
        public workStarted: string,
        public commentsAvailable: boolean
    ){}
}