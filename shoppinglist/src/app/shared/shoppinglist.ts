import { Item } from './item';
export { Item } from './item';
import { User } from './user';
export { User } from './user';
import { Feedback } from "./feedback";
export { Feedback } from "./feedback";

export class Shoppinglist {

    constructor(
        public id: number,
        public title: string,
        public dueDate: Date,
        public creator_id: number,
        public creator: User[],
        public items: Item[],
        public total_price: number,
        public helper_id?: number,
        public helper?: User[],
        public feedbacks?: Feedback[],
    ){ }
}
