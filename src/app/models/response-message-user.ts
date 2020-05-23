import { User } from './user';
import { ResponseMessage } from './response-message';

export class ResponseMessageUser extends ResponseMessage {

    public datas: User[] = [];

    constructor() {
        super();
    }
}
