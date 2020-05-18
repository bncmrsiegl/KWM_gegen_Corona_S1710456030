import { Shoppinglist } from "./shoppinglist";

export class ShoppinglistFactory {

    static empty(): Shoppinglist {
        return new Shoppinglist(null, '', new Date(), 0,
            [], [], 0, 0, []);
    }

    static fromObject(rawList: any) : Shoppinglist {
        return new Shoppinglist(
            rawList.id,
            rawList.title,
            rawList.dueDate,
            rawList.creator_id,
            rawList.creator,
            rawList.items,
            rawList.total_price,
            rawList.helper_id,
            rawList.hepler
        );
    }
}
