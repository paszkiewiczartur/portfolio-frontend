import { DataType } from './data-type.model';
import { LinkType } from './link-type.model';

export class Link{
    constructor(
        public id: number,
        public site: DataType,
        public entity: number,
        public linkType: LinkType
    ){}
}
