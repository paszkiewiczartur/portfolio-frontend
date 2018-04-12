import * as MainActions from './../store/main.actions';

export class TagDTO {
	constructor(
        public entity: number,
        public site: string,
        public tag: number
    ){}
}
