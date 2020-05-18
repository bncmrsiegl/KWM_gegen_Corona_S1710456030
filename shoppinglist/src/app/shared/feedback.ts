import { User } from "./user";
export { User } from "./user";

export class Feedback {

    static empty(): Feedback {
        return new Feedback(null, '',  0,
            0, new Date(), []);
    }

    constructor(
        public id: number,
        public text: string,
        public writer_id: number,
        public shopping_list_id: number,
        public created_at: Date,
        public writer: User[],
    ) { }

    static fromObject(raw: any): Feedback {
        return new Feedback(
            raw.id,
            raw.text,
            raw.writer_id,
            raw.shopping_list_id,
            typeof (raw.created_at) === 'string' ? new Date(raw.created_at) : raw.created_at,
            raw.writer
        );
    }
}
