import { ResponseMessage } from './response-message';
import { Product } from './product';

export class ResponseMessageProduct extends ResponseMessage {

    public datas: Product[] = [];

    constructor() {
        super();
    }
}
